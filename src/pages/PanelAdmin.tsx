import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Shield, 
  Users, 
  BarChart3, 
  Package, 
  ShoppingCart, 
  MessageCircle, 
  Network, 
  Building2, 
  Gift, 
  Car, 
  Plus, 
  Search, 
  LogOut, 
  LogIn, 
  Calendar,
  DollarSign,
  Phone,
  Trash2,
  Edit,
  Eye,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  Wrench,
  X,
  CreditCard,
  Banknote,
  Send,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { LOGO_URL } from '../components/home/Navbar';
import { BetaBadge } from '../components/BetaBadge';
import { useAuth } from '../lib/AuthContext';
import { 
  getAutos, 
  addAuto, 
  updateAuto, 
  deleteAuto,
  getAllServicios, 
  deleteServicio,
  getProductos, 
  addProducto, 
  updateProducto, 
  deleteProducto,
  getFamilias,
  addFamilia,
  getGrupos,
  addGrupo,
  getVentas,
  addVenta,
  getRecompensas,
  addRecompensa,
  deleteRecompensa,
  getCanjes,
  addCanje,
  getFidelidadConfig,
  updateFidelidadConfig,
  seedInitialDataIfEmpty
} from '../lib/db';
import { 
  Auto, 
  Servicio, 
  Producto, 
  Familia, 
  Grupo, 
  Venta, 
  Recompensa, 
  Canje, 
  FidelidadConfig,
  CategoriaProducto 
} from '../lib/types';
import { formatPesos } from '../lib/utils';
import { normalizarPatente, generarCodigoInvitacion } from '../lib/familias';
import { mensajeBienvenida, mensajeRecordatorio, abrirWhatsAppWeb } from '../lib/mensajesWhatsapp';
import NuevoServicio from '../components/admin/NuevoServicio';

interface PanelAdminProps {
  onNavigate: (path: string) => void;
}

type AdminTab = 'clientes' | 'estadisticas' | 'productos' | 'caja' | 'whatsapp' | 'familias' | 'grupos' | 'fidelidad';

export const PanelAdmin: React.FC<PanelAdminProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, isLoadingAuth, loginWithGoogle, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<AdminTab>('clientes');
  
  // Data state
  const [autos, setAutos] = useState<Auto[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [familias, setFamilias] = useState<Familia[]>([]);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [recompensas, setRecompensas] = useState<Recompensa[]>([]);
  const [canjes, setCanjes] = useState<Canje[]>([]);
  const [fidelidadConfig, setFidelidadConfig] = useState<FidelidadConfig>({ modo: 'fijo', monto_por_punto: 1000, puntos_fijos: 10 });
  const [loadingData, setLoadingData] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroTipoCliente, setFiltroTipoCliente] = useState<'todos' | 'aviso' | 'empresa' | 'puntos'>('todos');
  const [categoriaProductoFiltro, setCategoriaProductoFiltro] = useState<string>('todos');

  // Modals state
  const [modalNuevoAuto, setModalNuevoAuto] = useState(false);
  const [editingAuto, setEditingAuto] = useState<Auto | null>(null);
  const [autoParaServicio, setAutoParaServicio] = useState<Auto | null>(null);
  const [autoParaHistorial, setAutoParaHistorial] = useState<Auto | null>(null);
  const [modalNuevoProducto, setModalNuevoProducto] = useState(false);
  const [modalNuevaFamilia, setModalNuevaFamilia] = useState(false);
  const [modalNuevoGrupo, setModalNuevoGrupo] = useState(false);
  const [modalNuevaRecompensa, setModalNuevaRecompensa] = useState(false);
  const [modalNuevoCanje, setModalNuevoCanje] = useState(false);

  // Form states
  const [formAuto, setFormAuto] = useState({
    patente: '',
    marca: '',
    modelo: '',
    año: 2020,
    motor: '',
    kilometraje_actual: 0,
    aceite_recomendado: '',
    filtro_recomendado: '',
    nombre_titular: '',
    telefono_titular: '',
    dni_titular: '',
    email_titular: '',
    es_vehiculo_empresa: false
  });

  const [formProducto, setFormProducto] = useState<{
    nombre: string;
    categoria: CategoriaProducto;
    marca: string;
    descripcion: string;
    precio_referencia: number;
    stock_cantidad: number;
    codigo_barras: string;
  }>({
    nombre: '',
    categoria: 'lubricantes',
    marca: '',
    descripcion: '',
    precio_referencia: 0,
    stock_cantidad: 10,
    codigo_barras: ''
  });

  const [formGrupo, setFormGrupo] = useState({
    nombre: '',
    cuit: '',
    contacto_nombre: '',
    contacto_email: '',
    telefono: '',
    direccion: '',
    tipo_empresa: 'flota' as 'flota' | 'concesionaria' | 'alquiler' | 'transporte' | 'logistica' | 'otro'
  });

  const [formRecompensa, setFormRecompensa] = useState({
    nombre: '',
    descripcion: '',
    puntos_necesarios: 50,
    activa: true
  });

  const [formCanje, setFormCanje] = useState({
    auto_id: '',
    recompensa_id: ''
  });

  // POS / Cash Register state
  const [cart, setCart] = useState<{ producto: Producto; cantidad: number }[]>([]);
  const [formaPago, setFormaPago] = useState<'efectivo' | 'tarjeta' | 'transferencia'>('efectivo');
  const [clienteCajaNombre, setClienteCajaNombre] = useState('');
  const [patenteCaja, setPatenteCaja] = useState('');

  // Toast / feedback message
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const loadAllData = async () => {
    setLoadingData(true);
    try {
      await seedInitialDataIfEmpty();
      const [a, s, p, f, g, v, r, c, fc] = await Promise.all([
        getAutos(),
        getAllServicios(),
        getProductos(),
        getFamilias(),
        getGrupos(),
        getVentas(),
        getRecompensas(),
        getCanjes(),
        getFidelidadConfig()
      ]);
      setAutos(a);
      setServicios(s);
      setProductos(p);
      setFamilias(f);
      setGrupos(g);
      setVentas(v);
      setRecompensas(r);
      setCanjes(c);
      if (fc) setFidelidadConfig(fc);
    } catch (e) {
      console.error('Error loading data:', e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold tracking-wide">Verificando sesión...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center px-4 selection:bg-red-600 selection:text-white">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl text-center space-y-6">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-red-600/30 to-red-900/20 text-red-500 w-fit mx-auto border border-red-500/30 shadow-lg shadow-red-600/20">
            <Shield className="w-10 h-10" />
          </div>

          <div>
            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              Panel Admin
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Acceso exclusivo para el equipo y dueño de <span className="text-white font-semibold">JL Lubricentro</span>
            </p>
          </div>

          <button
            onClick={() => loginWithGoogle()}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Iniciar Sesión con Google</span>
          </button>

          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-slate-400 hover:text-white transition-colors block mx-auto pt-2"
          >
            ← Volver a la página principal
          </button>
        </div>
      </div>
    );
  }

  // Filtered autos
  const filteredAutos = autos.filter(a => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || (
      a.patente.toLowerCase().includes(q) ||
      (a.nombre_titular && a.nombre_titular.toLowerCase().includes(q)) ||
      (a.marca && a.marca.toLowerCase().includes(q)) ||
      (a.modelo && a.modelo.toLowerCase().includes(q)) ||
      (a.telefono_titular && a.telefono_titular.includes(q)) ||
      (a.dni_titular && a.dni_titular.includes(q))
    );

    if (!matchSearch) return false;

    if (filtroTipoCliente === 'empresa') return a.es_vehiculo_empresa;
    if (filtroTipoCliente === 'puntos') return (a.puntos || 0) > 0;
    if (filtroTipoCliente === 'aviso') {
      const srv = servicios.find(s => s.auto_id === a.id);
      return srv?.proximo_service_fecha || a.recibir_aviso_service;
    }
    return true;
  });

  // Filtered products
  const filteredProductos = productos.filter(p => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || (
      p.nombre.toLowerCase().includes(q) ||
      (p.marca && p.marca.toLowerCase().includes(q)) ||
      (p.codigo_barras && p.codigo_barras.includes(q))
    );
    const matchCat = categoriaProductoFiltro === 'todos' || p.categoria === categoriaProductoFiltro;
    return matchSearch && matchCat;
  });

  // Handlers for Autos
  const handleSaveAuto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuto.patente || !formAuto.marca || !formAuto.modelo) {
      alert('Completá al menos Patente, Marca y Modelo');
      return;
    }

    try {
      if (editingAuto && editingAuto.id) {
        await updateAuto(editingAuto.id, {
          patente: normalizarPatente(formAuto.patente),
          marca: formAuto.marca,
          modelo: formAuto.modelo,
          año: Number(formAuto.año),
          motor: formAuto.motor,
          kilometraje_actual: Number(formAuto.kilometraje_actual),
          aceite_recomendado: formAuto.aceite_recomendado,
          filtro_recomendado: formAuto.filtro_recomendado,
          nombre_titular: formAuto.nombre_titular,
          telefono_titular: formAuto.telefono_titular,
          dni_titular: formAuto.dni_titular,
          email_titular: formAuto.email_titular,
          es_vehiculo_empresa: formAuto.es_vehiculo_empresa
        });
        showToast('Vehículo actualizado exitosamente');
      } else {
        await addAuto({
          patente: normalizarPatente(formAuto.patente),
          marca: formAuto.marca,
          modelo: formAuto.modelo,
          año: Number(formAuto.año),
          motor: formAuto.motor,
          kilometraje_actual: Number(formAuto.kilometraje_actual),
          aceite_recomendado: formAuto.aceite_recomendado,
          filtro_recomendado: formAuto.filtro_recomendado,
          nombre_titular: formAuto.nombre_titular,
          telefono_titular: formAuto.telefono_titular,
          dni_titular: formAuto.dni_titular,
          email_titular: formAuto.email_titular,
          es_vehiculo_empresa: formAuto.es_vehiculo_empresa,
          puntos: 0
        });
        showToast('Nuevo vehículo registrado');
      }
      setModalNuevoAuto(false);
      setEditingAuto(null);
      await loadAllData();
    } catch (err) {
      console.error(err);
      alert('Error guardando vehículo');
    }
  };

  const handleDeleteAuto = async (id: string, patente: string) => {
    if (confirm(`¿Estás seguro de eliminar el vehículo ${patente}?`)) {
      try {
        await deleteAuto(id);
        showToast(`Vehículo ${patente} eliminado`);
        await loadAllData();
      } catch (err) {
        alert('Error eliminando vehículo');
      }
    }
  };

  // Handlers for Products
  const handleSaveProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProducto.nombre) {
      alert('Ingresá el nombre del producto');
      return;
    }
    try {
      await addProducto({
        nombre: formProducto.nombre,
        categoria: formProducto.categoria,
        marca: formProducto.marca,
        descripcion: formProducto.descripcion,
        precio_referencia: Number(formProducto.precio_referencia),
        stock_cantidad: Number(formProducto.stock_cantidad),
        stock_disponible: Number(formProducto.stock_cantidad) > 0,
        codigo_barras: formProducto.codigo_barras
      });
      showToast('Producto agregado al catálogo');
      setModalNuevoProducto(false);
      setFormProducto({
        nombre: '',
        categoria: 'lubricantes',
        marca: '',
        descripcion: '',
        precio_referencia: 0,
        stock_cantidad: 10,
        codigo_barras: ''
      });
      await loadAllData();
    } catch (err) {
      alert('Error guardando producto');
    }
  };

  const handleUpdateStock = async (p: Producto, delta: number) => {
    if (!p.id) return;
    const newQty = Math.max(0, (p.stock_cantidad || 0) + delta);
    try {
      await updateProducto(p.id, {
        stock_cantidad: newQty,
        stock_disponible: newQty > 0
      });
      setProductos(prev => prev.map(item => item.id === p.id ? { ...item, stock_cantidad: newQty, stock_disponible: newQty > 0 } : item));
    } catch (err) {
      console.error('Error al actualizar stock:', err);
    }
  };

  // Handlers for POS / Cart
  const addToCart = (p: Producto) => {
    setCart(prev => {
      const existing = prev.find(item => item.producto.id === p.id);
      if (existing) {
        return prev.map(item => item.producto.id === p.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { producto: p, cantidad: 1 }];
    });
  };

  const updateCartQty = (pId: string, qty: number) => {
    if (qty <= 0) {
      setCart(prev => prev.filter(i => i.producto.id !== pId));
    } else {
      setCart(prev => prev.map(i => i.producto.id === pId ? { ...i, cantidad: qty } : i));
    }
  };

  const totalCart = cart.reduce((acc, item) => acc + (item.producto.precio_referencia || 0) * item.cantidad, 0);

  const handleRegistrarVenta = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    try {
      await addVenta({
        cliente_nombre: clienteCajaNombre || 'Cliente mostrador',
        patente: patenteCaja ? normalizarPatente(patenteCaja) : undefined,
        items: cart.map(i => ({
          producto_id: i.producto.id,
          nombre: i.producto.nombre,
          cantidad: i.cantidad,
          precio: i.producto.precio_referencia || 0
        })),
        monto_total: totalCart,
        fecha: new Date().toISOString(),
        forma_pago: formaPago
      });
      showToast(`¡Venta registrada por ${formatPesos(totalCart)}!`);
      setCart([]);
      setClienteCajaNombre('');
      setPatenteCaja('');
      await loadAllData();
    } catch (err) {
      alert('Error registrando la venta');
    }
  };

  // Handlers for Familias
  const handleCrearFamilia = async () => {
    const code = generarCodigoInvitacion();
    try {
      await addFamilia(code);
      showToast(`Familia creada con código: ${code}`);
      setModalNuevaFamilia(false);
      await loadAllData();
    } catch (err) {
      alert('Error creando familia');
    }
  };

  // Handlers for Grupos
  const handleCrearGrupo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formGrupo.nombre) {
      alert('Ingresá el nombre de la empresa');
      return;
    }
    try {
      await addGrupo({
        ...formGrupo,
        activa: true
      });
      showToast(`Empresa ${formGrupo.nombre} registrada`);
      setModalNuevoGrupo(false);
      setFormGrupo({
        nombre: '',
        cuit: '',
        contacto_nombre: '',
        contacto_email: '',
        telefono: '',
        direccion: '',
        tipo_empresa: 'flota'
      });
      await loadAllData();
    } catch (err) {
      alert('Error creando empresa');
    }
  };

  // Handlers for Recompensas & Canjes
  const handleCrearRecompensa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRecompensa.nombre) {
      alert('Ingresá el nombre de la recompensa');
      return;
    }
    try {
      await addRecompensa({
        nombre: formRecompensa.nombre,
        descripcion: formRecompensa.descripcion,
        puntos_necesarios: Number(formRecompensa.puntos_necesarios),
        activa: formRecompensa.activa
      });
      showToast('Recompensa creada con éxito');
      setModalNuevaRecompensa(false);
      setFormRecompensa({ nombre: '', descripcion: '', puntos_necesarios: 50, activa: true });
      await loadAllData();
    } catch (err) {
      alert('Error creando recompensa');
    }
  };

  const handleRealizarCanje = async (e: React.FormEvent) => {
    e.preventDefault();
    const auto = autos.find(a => a.id === formCanje.auto_id);
    const rec = recompensas.find(r => r.id === formCanje.recompensa_id);
    if (!auto || !rec) {
      alert('Seleccioná un cliente y una recompensa válida');
      return;
    }
    if ((auto.puntos || 0) < rec.puntos_necesarios) {
      alert(`El cliente tiene ${auto.puntos || 0} pts y necesita ${rec.puntos_necesarios} pts`);
      return;
    }
    try {
      // Registrar canje
      await addCanje({
        auto_id: auto.id,
        patente: auto.patente,
        cliente_nombre: auto.nombre_titular,
        recompensa_id: rec.id,
        recompensa_nombre: rec.nombre,
        puntos_gastados: rec.puntos_necesarios,
        fecha: new Date().toISOString(),
        realizado: true
      });

      // Descontar puntos al auto
      if (auto.id) {
        await updateAuto(auto.id, {
          puntos: (auto.puntos || 0) - rec.puntos_necesarios
        });
      }

      showToast(`¡Canje de ${rec.nombre} realizado para ${auto.patente}!`);
      setModalNuevoCanje(false);
      setFormCanje({ auto_id: '', recompensa_id: '' });
      await loadAllData();
    } catch (err) {
      alert('Error realizando canje');
    }
  };

  // WhatsApp due services calculation
  const hoyStr = new Date().toISOString().split('T')[0];
  const autosConServiceProximo = autos.filter(a => {
    const srvs = servicios.filter(s => s.auto_id === a.id);
    if (srvs.length === 0) return false;
    const ult = srvs[0];
    if (ult.proximo_service_fecha && ult.proximo_service_fecha <= hoyStr) return true;
    if (ult.proximo_service_km && a.kilometraje_actual && a.kilometraje_actual >= ult.proximo_service_km - 1000) return true;
    return a.recibir_aviso_service;
  });

  // Stats calculation
  const totalFacturacion = servicios.reduce((acc, s) => acc + (s.monto || 0), 0) + 
    ventas.reduce((acc, v) => acc + (v.monto_total || 0), 0);
  const ticketPromedio = servicios.length > 0 ? Math.round(servicios.reduce((acc, s) => acc + (s.monto || 0), 0) / servicios.length) : 0;
  
  const serviciosPorTipo = servicios.reduce((acc: Record<string, number>, s) => {
    const t = s.tipo_servicio || 'otro';
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});

  const marcasCount = autos.reduce((acc: Record<string, number>, a) => {
    const m = a.marca || 'Otra';
    acc[m] = (acc[m] || 0) + 1;
    return acc;
  }, {});
  const topMarcas = Object.entries(marcasCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-red-600 selection:text-white pb-24">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-white/10 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Volver a la web pública"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <img src={LOGO_URL} alt="JL" className="h-7 w-auto invert" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-lg uppercase tracking-tight text-white">
                    Mi Lubricentro Admin
                  </span>
                  <BetaBadge />
                </div>
                <span className="text-[10px] text-slate-400">Sistema Integral de Taller</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadAllData()}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Recargar datos"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin text-red-500' : ''}`} />
            </button>
            <div className="hidden sm:block text-right text-xs">
              <div className="font-bold text-white">{user?.displayName || 'Administrador'}</div>
              <div className="text-[10px] text-slate-400">{user?.email}</div>
            </div>
            <button
              onClick={() => logout()}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar with horizontal scroll */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'clientes', name: 'Clientes', icon: Users, badge: autos.length },
            { id: 'estadisticas', name: 'Estadísticas', icon: BarChart3 },
            { id: 'productos', name: 'Productos', icon: Package, badge: productos.length },
            { id: 'caja', name: 'Caja & POS', icon: ShoppingCart },
            { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, badge: autosConServiceProximo.length },
            { id: 'familias', name: 'Familias', icon: Network, badge: familias.length },
            { id: 'grupos', name: 'Flotas & Empresas', icon: Building2, badge: grupos.length },
            { id: 'fidelidad', name: 'Fidelidad', icon: Gift, badge: recompensas.length }
          ].map((t) => {
            const Icon = t.icon;
            const active = currentTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setCurrentTab(t.id as AdminTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30 ring-1 ring-red-400'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.name}</span>
                {t.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-black/30 text-white font-bold' : 'bg-white/10 text-slate-400'
                  }`}>
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ========================================================
            TAB 1: CLIENTES Y AUTOS
        ======================================================== */}
        {currentTab === 'clientes' && (
          <div className="space-y-6">
            
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600/20 via-white/5 to-transparent border border-blue-500/20 shadow-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Total Clientes / Titulares</span>
                <div className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
                  {autos.length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Registrados con patente y datos</p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600/20 via-white/5 to-transparent border border-emerald-500/20 shadow-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">En Flotas / Empresas</span>
                <div className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
                  {autos.filter(a => a.es_vehiculo_empresa).length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Vehículos corporativos asociados</p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-red-600/20 via-white/5 to-transparent border border-red-500/20 shadow-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">Servicios Realizados</span>
                <div className="font-display font-black text-3xl sm:text-4xl text-white mt-1">
                  {servicios.length}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Histórico general en taller</p>
              </div>
            </div>

            {/* Filter and Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por patente, titular, teléfono, modelo..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                {/* Filter chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {[
                    { id: 'todos', label: 'Todos' },
                    { id: 'aviso', label: 'Con Aviso' },
                    { id: 'empresa', label: 'Empresas' },
                    { id: 'puntos', label: 'Con Puntos' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFiltroTipoCliente(f.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        filtroTipoCliente === f.id
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingAuto(null);
                  setFormAuto({
                    patente: '',
                    marca: '',
                    modelo: '',
                    año: 2021,
                    motor: '',
                    kilometraje_actual: 0,
                    aceite_recomendado: 'Shell Helix 10W40',
                    filtro_recomendado: '',
                    nombre_titular: '',
                    telefono_titular: '',
                    dni_titular: '',
                    email_titular: '',
                    es_vehiculo_empresa: false
                  });
                  setModalNuevoAuto(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Cliente / Auto</span>
              </button>
            </div>

            {/* List of Vehicles */}
            {filteredAutos.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3">
                <Car className="w-10 h-10 text-slate-500 mx-auto" />
                <h4 className="font-display font-bold text-lg text-white">No se encontraron vehículos</h4>
                <p className="text-xs text-slate-400">Probá con otro término de búsqueda o registrá un nuevo vehículo.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAutos.map((auto) => {
                  const srvCount = servicios.filter(s => s.auto_id === auto.id).length;
                  return (
                    <div
                      key={auto.id}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-3 relative group flex flex-col justify-between"
                    >
                      <div>
                        {/* Top bar with vehicle name and Argentine license plate */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-display font-bold text-lg uppercase text-white tracking-tight leading-tight">
                              {auto.marca} {auto.modelo}
                            </h4>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {auto.nombre_titular || 'Sin titular cargado'}
                            </div>
                          </div>
                          
                          {/* Argentine plate styling */}
                          <div className="px-2.5 py-1 rounded bg-black border border-white/20 text-white font-mono font-black text-xs tracking-widest shadow-inner shrink-0">
                            {auto.patente}
                          </div>
                        </div>

                        {/* Specs and details */}
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400 bg-black/20 p-2.5 rounded-xl border border-white/5">
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Km actual</span>
                            <span className="text-white font-semibold">{auto.kilometraje_actual ? auto.kilometraje_actual.toLocaleString('es-AR') : '0'} km</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Aceite rec.</span>
                            <span className="text-white font-semibold line-clamp-1">{auto.aceite_recomendado || 'A definir'}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Servicios</span>
                            <span className="text-emerald-400 font-bold">{srvCount} realizados</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block uppercase">Puntos</span>
                            <span className="text-amber-400 font-bold">{auto.puntos || 0} pts</span>
                          </div>
                        </div>

                        {/* Contact details */}
                        {auto.telefono_titular && (
                          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
                            <span className="flex items-center gap-1.5 text-[11px]">
                              <Phone className="w-3 h-3 text-slate-500" />
                              {auto.telefono_titular}
                            </span>
                            <button
                              onClick={() => {
                                const msg = mensajeBienvenida(auto.nombre_titular || '', auto);
                                abrirWhatsAppWeb(auto.telefono_titular || '', msg);
                              }}
                              className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <MessageCircle className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-1.5">
                        <button
                          onClick={() => setAutoParaServicio(auto)}
                          className="flex-1 py-2 px-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/20 transition-all cursor-pointer"
                          title="Cargar nuevo servicio realizado"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Servicio</span>
                        </button>

                        <button
                          onClick={() => setAutoParaHistorial(auto)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Ver historial de servicios"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setEditingAuto(auto);
                            setFormAuto({
                              patente: auto.patente,
                              marca: auto.marca,
                              modelo: auto.modelo,
                              año: auto.año || 2021,
                              motor: auto.motor || '',
                              kilometraje_actual: auto.kilometraje_actual || 0,
                              aceite_recomendado: auto.aceite_recomendado || '',
                              filtro_recomendado: auto.filtro_recomendado || '',
                              nombre_titular: auto.nombre_titular || '',
                              telefono_titular: auto.telefono_titular || '',
                              dni_titular: auto.dni_titular || '',
                              email_titular: auto.email_titular || '',
                              es_vehiculo_empresa: auto.es_vehiculo_empresa || false
                            });
                            setModalNuevoAuto(true);
                          }}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Editar vehículo"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => auto.id && handleDeleteAuto(auto.id, auto.patente)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-red-600/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                          title="Eliminar vehículo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ========================================================
            TAB 2: ESTADÍSTICAS Y MÉTRICAS
        ======================================================== */}
        {currentTab === 'estadisticas' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                Rendimiento & Métricas
              </h3>
              <p className="text-xs text-slate-400">Resumen comercial y volumen de trabajo en taller</p>
            </div>

            {/* 4 Big KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  Facturación Estimada
                </span>
                <div className="font-display font-black text-2xl sm:text-3xl text-white">
                  {formatPesos(totalFacturacion)}
                </div>
                <span className="text-[11px] text-slate-500">Servicios + Mostrador</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Ticket Promedio
                </span>
                <div className="font-display font-black text-2xl sm:text-3xl text-white">
                  {formatPesos(ticketPromedio)}
                </div>
                <span className="text-[11px] text-slate-500">Por servicio en taller</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" />
                  Total Servicios
                </span>
                <div className="font-display font-black text-2xl sm:text-3xl text-white">
                  {servicios.length}
                </div>
                <span className="text-[11px] text-slate-500">Registrados en la plataforma</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Car className="w-4 h-4" />
                  Vehículos Activos
                </span>
                <div className="font-display font-black text-2xl sm:text-3xl text-white">
                  {autos.length}
                </div>
                <span className="text-[11px] text-slate-500">Base de clientes única</span>
              </div>
            </div>

            {/* Breakdown Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Servicios por tipo */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="font-display font-bold text-lg uppercase text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-red-500" />
                  <span>Distribución por Tipo de Servicio</span>
                </h4>
                <div className="space-y-3">
                  {Object.entries(serviciosPorTipo).length === 0 ? (
                    <p className="text-xs text-slate-500">No hay servicios registrados todavía.</p>
                  ) : (
                    Object.entries(serviciosPorTipo).map(([tipo, count]) => {
                      const pct = Math.round((count / (servicios.length || 1)) * 100);
                      return (
                        <div key={tipo} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-300 capitalize">{tipo.replace('_', ' ')}</span>
                            <span className="text-white">{count} ({pct}%)</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Top Marcas */}
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="font-display font-bold text-lg uppercase text-white flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-500" />
                  <span>Top 5 Marcas Atendidas</span>
                </h4>
                <div className="space-y-3">
                  {topMarcas.length === 0 ? (
                    <p className="text-xs text-slate-500">Sin datos de vehículos.</p>
                  ) : (
                    topMarcas.map(([marca, count]) => {
                      const pct = Math.round((count / (autos.length || 1)) * 100);
                      return (
                        <div key={marca} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-300">{marca}</span>
                            <span className="text-white">{count} autos ({pct}%)</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            {/* Ultimos 5 Servicios Realizados */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <h4 className="font-display font-bold text-lg uppercase text-white">
                Últimos Servicios Registrados
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="py-2 font-bold">Fecha</th>
                      <th className="py-2 font-bold">Vehículo</th>
                      <th className="py-2 font-bold">Tipo</th>
                      <th className="py-2 font-bold">Km</th>
                      <th className="py-2 font-bold">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {servicios.slice(0, 5).map(s => {
                      const auto = autos.find(a => a.id === s.auto_id);
                      return (
                        <tr key={s.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 text-slate-400">{s.fecha_servicio}</td>
                          <td className="py-3 font-semibold text-white">
                            {auto ? `${auto.marca} ${auto.modelo} (${auto.patente})` : 'Vehículo'}
                          </td>
                          <td className="py-3 capitalize text-slate-300">{s.tipo_servicio.replace('_', ' ')}</td>
                          <td className="py-3 font-mono text-slate-300">{s.kilometraje?.toLocaleString('es-AR')} km</td>
                          <td className="py-3 font-bold text-emerald-400">{formatPesos(s.monto || 0)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 3: PRODUCTOS & INVENTARIO
        ======================================================== */}
        {currentTab === 'productos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                  Productos & Stock ({productos.length})
                </h3>
                <p className="text-xs text-slate-400">Inventario centralizado de lubricantes, repuestos y filtros</p>
              </div>

              <button
                onClick={() => setModalNuevoProducto(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Producto</span>
              </button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'lubricantes', label: 'Lubricantes' },
                { id: 'filtros', label: 'Filtros' },
                { id: 'refrigerantes', label: 'Refrigerantes' },
                { id: 'liquido_frenos', label: 'Líquido de Frenos' },
                { id: 'aditivos_limpieza', label: 'Aditivos & Limpieza' },
                { id: 'accesorios', label: 'Accesorios' }
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setCategoriaProductoFiltro(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    categoriaProductoFiltro === c.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProductos.map(p => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                      <span className="text-blue-400">{p.marca || 'Genérico'}</span>
                      <span className="text-slate-500 capitalize">{p.categoria}</span>
                    </div>

                    <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug">
                      {p.nombre}
                    </h4>
                    {p.descripcion && (
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {p.descripcion}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-display font-black text-lg text-white">
                        {formatPesos(p.precio_referencia)}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        (p.stock_cantidad || 0) <= 3
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        Stock: {p.stock_cantidad || 0}
                      </span>
                    </div>

                    {/* Stock Quick-Adjust and Cart actions */}
                    <div className="flex items-center justify-between gap-1.5 pt-1">
                      <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                        <button
                          onClick={() => handleUpdateStock(p, -1)}
                          className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center cursor-pointer"
                          title="Restar 1"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-slate-300 px-1">{p.stock_cantidad || 0}</span>
                        <button
                          onClick={() => handleUpdateStock(p, 1)}
                          className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center cursor-pointer"
                          title="Sumar 1"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => addToCart(p)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                        title="Vender en caja"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>A caja</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 4: CAJA & PUNTO DE VENTA (POS)
        ======================================================== */}
        {currentTab === 'caja' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Terminal de Venta (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-red-500" />
                    <span>Punto de Venta / Mostrador</span>
                  </h3>
                  <span className="text-xs text-slate-400">Venta rápida de lubricantes y repuestos</span>
                </div>

                {/* Cliente / Patente (opcional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <input
                    type="text"
                    value={clienteCajaNombre}
                    onChange={(e) => setClienteCajaNombre(e.target.value)}
                    placeholder="Nombre del cliente (opcional)"
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    value={patenteCaja}
                    onChange={(e) => setPatenteCaja(e.target.value.toUpperCase())}
                    placeholder="Patente del vehículo (opcional)"
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 uppercase font-mono focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Quick product selector */}
                <div className="pt-2">
                  <span className="text-xs font-bold text-slate-300 block mb-2">Tocar producto para agregar al ticket:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                    {productos.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => addToCart(p)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all cursor-pointer"
                      >
                        <div className="text-[10px] text-blue-400 font-bold uppercase">{p.marca || 'Genérico'}</div>
                        <div className="text-xs font-bold text-white line-clamp-1">{p.nombre}</div>
                        <div className="text-xs font-bold text-emerald-400 mt-1">{formatPesos(p.precio_referencia)}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cart Table */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Artículos en el ticket ({cart.length})
                  </h4>

                  {cart.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-4 text-center">
                      El carrito está vacío. Agregá productos arriba.
                    </p>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {cart.map(item => (
                        <div key={item.producto.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                          <div className="flex-1">
                            <div className="font-bold text-white">{item.producto.nombre}</div>
                            <div className="text-slate-400 text-[11px]">{formatPesos(item.producto.precio_referencia)} c/u</div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => updateCartQty(item.producto.id!, item.cantidad - 1)}
                              className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-bold text-white">{item.cantidad}</span>
                            <button
                              onClick={() => updateCartQty(item.producto.id!, item.cantidad + 1)}
                              className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="w-24 text-right font-bold text-white">
                            {formatPesos((item.producto.precio_referencia || 0) * item.cantidad)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Forma de Pago and Total */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'efectivo', label: 'Efectivo', icon: Banknote },
                      { id: 'tarjeta', label: 'Tarjeta', icon: CreditCard },
                      { id: 'transferencia', label: 'Transferencia', icon: DollarSign }
                    ].map(f => {
                      const Icon = f.icon;
                      const active = formaPago === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setFormaPago(f.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                            active
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{f.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total a cobrar</span>
                    <span className="font-display font-black text-3xl text-emerald-400">
                      {formatPesos(totalCart)}
                    </span>
                  </div>
                </div>

                <button
                  disabled={cart.length === 0}
                  onClick={handleRegistrarVenta}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-40 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Cobrar & Registrar Venta</span>
                </button>

              </div>
            </div>

            {/* Resumen del Día y Ventas Recientes (1 Col) */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="font-display font-bold text-lg uppercase text-white">
                  Caja del Día
                </h4>

                <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                  <span className="text-xs text-slate-400">Total Ventas Registradas</span>
                  <div className="font-display font-black text-2xl text-white">
                    {formatPesos(ventas.reduce((acc, v) => acc + (v.monto_total || 0), 0))}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold">{ventas.length} transacciones</span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">Últimas Ventas</span>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {ventas.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">No hay ventas registradas aún.</p>
                    ) : (
                      ventas.map(v => (
                        <div key={v.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-white">{v.cliente_nombre || 'Cliente mostrador'}</span>
                            <span className="font-bold text-emerald-400">{formatPesos(v.monto_total)}</span>
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-400">
                            <span className="capitalize">{v.forma_pago}</span>
                            <span>{v.items?.length || 0} ítems</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 5: WHATSAPP Y RECORDATORIOS
        ======================================================== */}
        {currentTab === 'whatsapp' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-emerald-500" />
                  <span>Recordatorios de Service por WhatsApp</span>
                </h3>
                <p className="text-xs text-slate-400">Vehículos con cambio de aceite sugerido o fecha estimada próxima</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {autosConServiceProximo.length === 0 ? (
                <div className="col-span-full p-12 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="font-display font-bold text-lg text-white">¡Al día! No hay avisos urgentes</h4>
                  <p className="text-xs text-slate-400">Todos los vehículos tienen services recientes o fechas holgadas.</p>
                </div>
              ) : (
                autosConServiceProximo.map(auto => {
                  const srv = servicios.find(s => s.auto_id === auto.id);
                  const fechaEstimada = srv?.proximo_service_fecha || 'Pronto';
                  const msg = mensajeRecordatorio(auto.nombre_titular || '', `${auto.marca} ${auto.modelo}`, fechaEstimada);

                  return (
                    <div
                      key={auto.id}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all space-y-4 shadow-xl"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-bold text-lg text-white uppercase">
                            {auto.marca} {auto.modelo}
                          </h4>
                          <div className="text-xs text-slate-400">{auto.nombre_titular || 'Sin titular'}</div>
                        </div>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-black border border-white/20 text-white font-bold">
                          {auto.patente}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-300 space-y-1">
                        <div>
                          <span className="text-slate-500">Próxima fecha: </span>
                          <span className="text-amber-400 font-bold">{fechaEstimada}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Próximo km: </span>
                          <span className="text-white font-semibold">{srv?.proximo_service_km?.toLocaleString('es-AR') || '10.000'} km</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-200">
                        "{msg.slice(0, 100)}..."
                      </div>

                      <button
                        onClick={() => abrirWhatsAppWeb(auto.telefono_titular || '', msg)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Abrir WhatsApp Web</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 6: FAMILIAS
        ======================================================== */}
        {currentTab === 'familias' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white flex items-center gap-2">
                  <Network className="w-6 h-6 text-purple-500" />
                  <span>Familias & Grupos Familiares</span>
                </h3>
                <p className="text-xs text-slate-400">Agrupá múltiples vehículos bajo un mismo código de invitación</p>
              </div>

              <button
                onClick={handleCrearFamilia}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Crear Familia</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familias.length === 0 ? (
                <div className="col-span-full p-12 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3">
                  <Network className="w-10 h-10 text-purple-500 mx-auto" />
                  <h4 className="font-display font-bold text-lg text-white">No hay familias creadas aún</h4>
                  <p className="text-xs text-slate-400">Creá la primera familia para generar códigos de invitación.</p>
                </div>
              ) : (
                familias.map(f => {
                  const autosEnFamilia = autos.filter(a => a.familia_id === f.id);
                  const shareUrl = `${window.location.origin}/invitacion?codigo=${f.codigo_invitacion}`;
                  return (
                    <div key={f.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-bold uppercase">Código de Familia</span>
                        <span className="font-mono text-xl font-black text-purple-400 tracking-wider">
                          {f.codigo_invitacion}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-2">
                        <span className="text-xs font-bold text-slate-300 block">
                          Vehículos Vinculados ({autosEnFamilia.length})
                        </span>
                        {autosEnFamilia.length === 0 ? (
                          <span className="text-xs text-slate-500 italic">Ningún auto vinculado todavía</span>
                        ) : (
                          <div className="space-y-1">
                            {autosEnFamilia.map(a => (
                              <div key={a.id} className="text-xs text-slate-300 flex justify-between">
                                <span>{a.marca} {a.modelo}</span>
                                <span className="font-mono font-bold text-white">{a.patente}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shareUrl);
                          showToast('Enlace de invitación copiado');
                        }}
                        className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar link de invitación</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 7: GRUPOS Y EMPRESAS (FLOTAS)
        ======================================================== */}
        {currentTab === 'grupos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-amber-500" />
                  <span>Empresas & Gestión de Flotas</span>
                </h3>
                <p className="text-xs text-slate-400">Control unificado de vehículos corporativos y transportes</p>
              </div>

              <button
                onClick={() => setModalNuevoGrupo(true)}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Empresa</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {grupos.length === 0 ? (
                <div className="col-span-full p-12 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3">
                  <Building2 className="w-10 h-10 text-amber-500 mx-auto" />
                  <h4 className="font-display font-bold text-lg text-white">No hay empresas registradas</h4>
                  <p className="text-xs text-slate-400">Registrá la primera empresa para gestionar su flota.</p>
                </div>
              ) : (
                grupos.map(g => {
                  const flotaAutos = autos.filter(a => a.grupo_id === g.id);
                  return (
                    <div key={g.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 shadow-xl">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-bold text-lg uppercase text-white">{g.nombre}</h4>
                          <span className="text-xs text-amber-400 capitalize">{g.tipo_empresa || 'Flota'}</span>
                        </div>
                        {g.cuit && (
                          <span className="font-mono text-xs text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                            CUIT: {g.cuit}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 space-y-1 pt-1">
                        {g.contacto_nombre && <div>Contacto: <span className="text-white">{g.contacto_nombre}</span></div>}
                        {g.telefono && <div>Teléfono: <span className="text-white">{g.telefono}</span></div>}
                      </div>

                      <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-300">
                        Vehículos en la flota: <span className="font-bold text-white">{flotaAutos.length}</span>
                      </div>

                      <button
                        onClick={() => onNavigate(`/portal-empresa?id=${g.id}`)}
                        className="w-full py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Abrir Portal de la Empresa</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 8: PROGRAMA DE FIDELIDAD & PUNTOS
        ======================================================== */}
        {currentTab === 'fidelidad' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white flex items-center gap-2">
                  <Gift className="w-6 h-6 text-amber-400" />
                  <span>Programa de Fidelidad & Puntos</span>
                </h3>
                <p className="text-xs text-slate-400">Recompensá a los clientes frecuentes con premios y beneficios</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalNuevaRecompensa(true)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nueva Recompensa</span>
                </button>
                <button
                  onClick={() => setModalNuevoCanje(true)}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Registrar Canje</span>
                </button>
              </div>
            </div>

            {/* Config Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <h4 className="font-display font-bold text-lg uppercase text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Reglas de Suma de Puntos</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => {
                    const updated: FidelidadConfig = { ...fidelidadConfig, modo: 'fijo' };
                    setFidelidadConfig(updated);
                    updateFidelidadConfig(updated);
                    showToast('Modo de puntos actualizado a Fijo');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    fidelidadConfig.modo === 'fijo'
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-lg'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="font-bold text-sm text-white block">Puntos Fijos por Servicio</span>
                  <span className="text-xs text-slate-400 block mt-1">Suma 10 puntos por cada service completado en taller.</span>
                </div>

                <div
                  onClick={() => {
                    const updated: FidelidadConfig = { ...fidelidadConfig, modo: 'monto' };
                    setFidelidadConfig(updated);
                    updateFidelidadConfig(updated);
                    showToast('Modo de puntos actualizado por Monto');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    fidelidadConfig.modo === 'monto'
                      ? 'bg-amber-500/10 border-amber-500/40 shadow-lg'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="font-bold text-sm text-white block">Puntos por Monto Facturado</span>
                  <span className="text-xs text-slate-400 block mt-1">1 punto por cada $1.000 consumidos en el ticket.</span>
                </div>
              </div>
            </div>

            {/* Recompensas Activas Grid */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-lg uppercase text-white">Catálogo de Premios</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recompensas.map(r => (
                  <div key={r.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex justify-between items-center">
                        <h5 className="font-bold text-white text-sm">{r.nombre}</h5>
                        <span className="font-display font-black text-amber-400 text-lg">
                          {r.puntos_necesarios} pts
                        </span>
                      </div>
                      {r.descripcion && (
                        <p className="text-xs text-slate-400 mt-1">{r.descripcion}</p>
                      )}
                    </div>

                    <button
                      onClick={() => r.id && deleteRecompensa(r.id).then(() => loadAllData())}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold self-start cursor-pointer"
                    >
                      Eliminar premio
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Historial de Canjes */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3">
              <h4 className="font-display font-bold text-lg uppercase text-white">Historial de Premios Canjeados</h4>
              {canjes.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No se han realizado canjes todavía.</p>
              ) : (
                <div className="divide-y divide-white/5 text-xs">
                  {canjes.map(c => (
                    <div key={c.id} className="py-2.5 flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white">{c.cliente_nombre || 'Cliente'}</span>
                        <span className="text-slate-400 ml-2">({c.patente})</span>
                        <span className="text-amber-400 ml-2">canjeó {c.recompensa_nombre}</span>
                      </div>
                      <span className="text-slate-400">{c.fecha?.split('T')[0]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* ========================================================
          MODALS SECTION
      ======================================================== */}

      {/* Modal Nuevo Auto / Editar Auto */}
      <AnimatePresence>
        {modalNuevoAuto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-black text-2xl uppercase tracking-tight">
                  {editingAuto ? 'Editar Vehículo' : 'Nuevo Cliente / Auto'}
                </h3>
                <button onClick={() => setModalNuevoAuto(false)} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAuto} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Patente *</label>
                    <input
                      required
                      type="text"
                      value={formAuto.patente}
                      onChange={(e) => setFormAuto({ ...formAuto, patente: e.target.value.toUpperCase() })}
                      placeholder="AE123CD"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 font-mono font-bold text-white uppercase focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Año</label>
                    <input
                      type="number"
                      value={formAuto.año}
                      onChange={(e) => setFormAuto({ ...formAuto, año: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Marca *</label>
                    <input
                      required
                      type="text"
                      value={formAuto.marca}
                      onChange={(e) => setFormAuto({ ...formAuto, marca: e.target.value })}
                      placeholder="Chevrolet, Ford, Toyota..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Modelo *</label>
                    <input
                      required
                      type="text"
                      value={formAuto.modelo}
                      onChange={(e) => setFormAuto({ ...formAuto, modelo: e.target.value })}
                      placeholder="Onix, Focus, Hilux..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Kilometraje Actual</label>
                    <input
                      type="number"
                      value={formAuto.kilometraje_actual}
                      onChange={(e) => setFormAuto({ ...formAuto, kilometraje_actual: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Motor</label>
                    <input
                      type="text"
                      value={formAuto.motor}
                      onChange={(e) => setFormAuto({ ...formAuto, motor: e.target.value })}
                      placeholder="1.4, 2.0 TDI..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Aceite Recomendado</label>
                  <input
                    type="text"
                    value={formAuto.aceite_recomendado}
                    onChange={(e) => setFormAuto({ ...formAuto, aceite_recomendado: e.target.value })}
                    placeholder="Shell Helix Ultra 5W-40"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="pt-2 border-t border-white/10">
                  <h4 className="text-xs font-bold text-white mb-2 uppercase">Datos del Titular</h4>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formAuto.nombre_titular}
                      onChange={(e) => setFormAuto({ ...formAuto, nombre_titular: e.target.value })}
                      placeholder="Nombre y Apellido"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={formAuto.telefono_titular}
                        onChange={(e) => setFormAuto({ ...formAuto, telefono_titular: e.target.value })}
                        placeholder="Teléfono / WhatsApp"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                      />
                      <input
                        type="text"
                        value={formAuto.dni_titular}
                        onChange={(e) => setFormAuto({ ...formAuto, dni_titular: e.target.value })}
                        placeholder="DNI"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="esEmpresa"
                    checked={formAuto.es_vehiculo_empresa}
                    onChange={(e) => setFormAuto({ ...formAuto, es_vehiculo_empresa: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="esEmpresa" className="text-slate-300 font-semibold cursor-pointer">
                    ¿Es vehículo perteneciente a empresa o flota comercial?
                  </label>
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalNuevoAuto(false)}
                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 text-white font-bold"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Nuevo Servicio (Componente Especializado) */}
      {autoParaServicio && (
        <NuevoServicio
          auto={autoParaServicio as any}
          serviciosPrevios={servicios.filter(s => s.auto_id === autoParaServicio.id) as any}
          onClose={() => setAutoParaServicio(null)}
          onGuardado={async () => {
            setAutoParaServicio(null);
            showToast('Servicio registrado exitosamente');
            await loadAllData();
          }}
        />
      )}

      {/* Modal Ver Historial de Servicios */}
      <AnimatePresence>
        {autoParaHistorial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight">
                    Historial de {autoParaHistorial.marca} {autoParaHistorial.modelo}
                  </h3>
                  <span className="font-mono text-xs text-red-400 font-bold">{autoParaHistorial.patente}</span>
                </div>
                <button onClick={() => setAutoParaHistorial(null)} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 pt-2">
                {servicios.filter(s => s.auto_id === autoParaHistorial.id).length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-6 text-center">No hay servicios registrados para este auto.</p>
                ) : (
                  servicios.filter(s => s.auto_id === autoParaHistorial.id).map(srv => (
                    <div key={srv.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-red-400 uppercase">{srv.tipo_servicio?.replace('_', ' ')}</span>
                        <span className="text-slate-400">{srv.fecha_servicio}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-300">
                        <div>Km: <span className="text-white font-bold">{srv.kilometraje?.toLocaleString('es-AR')}</span></div>
                        <div>Aceite: <span className="text-white">{srv.aceite_usado || 'N/A'}</span></div>
                        <div>Filtro aceite: <span className="text-white">{srv.filtro_aceite}</span></div>
                        <div>Filtro aire: <span className="text-white">{srv.filtro_aire}</span></div>
                      </div>
                      {srv.notas_tecnico && (
                        <p className="text-[11px] text-slate-400 bg-black/30 p-2 rounded-lg italic">
                          "{srv.notas_tecnico}"
                        </p>
                      )}
                      <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                        <span className="font-bold text-emerald-400">{formatPesos(srv.monto || 0)}</span>
                        <button
                          onClick={() => srv.id && deleteServicio(srv.id).then(() => loadAllData())}
                          className="text-[11px] text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                        >
                          Eliminar registro
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Nuevo Producto */}
      <AnimatePresence>
        {modalNuevoProducto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-black text-2xl uppercase tracking-tight">Nuevo Producto</h3>
                <button onClick={() => setModalNuevoProducto(false)} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProducto} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Nombre *</label>
                  <input
                    required
                    type="text"
                    value={formProducto.nombre}
                    onChange={(e) => setFormProducto({ ...formProducto, nombre: e.target.value })}
                    placeholder="Shell Helix Ultra 5W-40 4L"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Categoría</label>
                    <select
                      value={formProducto.categoria}
                      onChange={(e) => setFormProducto({ ...formProducto, categoria: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
                    >
                      <option value="lubricantes">Lubricantes</option>
                      <option value="filtros">Filtros</option>
                      <option value="refrigerantes">Refrigerantes</option>
                      <option value="liquido_frenos">Líquido Frenos</option>
                      <option value="aditivos_limpieza">Aditivos</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Marca</label>
                    <input
                      type="text"
                      value={formProducto.marca}
                      onChange={(e) => setFormProducto({ ...formProducto, marca: e.target.value })}
                      placeholder="Shell, Motul..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Precio Referencia ($)</label>
                    <input
                      type="number"
                      value={formProducto.precio_referencia}
                      onChange={(e) => setFormProducto({ ...formProducto, precio_referencia: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Stock Inicial</label>
                    <input
                      type="number"
                      value={formProducto.stock_cantidad}
                      onChange={(e) => setFormProducto({ ...formProducto, stock_cantidad: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Descripción</label>
                  <textarea
                    rows={2}
                    value={formProducto.descripcion}
                    onChange={(e) => setFormProducto({ ...formProducto, descripcion: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalNuevoProducto(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 text-white font-bold"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Nueva Empresa */}
      <AnimatePresence>
        {modalNuevoGrupo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-black text-2xl uppercase tracking-tight">Nueva Empresa / Flota</h3>
                <button onClick={() => setModalNuevoGrupo(false)} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCrearGrupo} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Razón Social / Nombre *</label>
                  <input
                    required
                    type="text"
                    value={formGrupo.nombre}
                    onChange={(e) => setFormGrupo({ ...formGrupo, nombre: e.target.value })}
                    placeholder="Logística Norte S.A."
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">CUIT</label>
                    <input
                      type="text"
                      value={formGrupo.cuit}
                      onChange={(e) => setFormGrupo({ ...formGrupo, cuit: e.target.value })}
                      placeholder="30-12345678-9"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Tipo</label>
                    <select
                      value={formGrupo.tipo_empresa}
                      onChange={(e) => setFormGrupo({ ...formGrupo, tipo_empresa: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
                    >
                      <option value="flota">Flota Propia</option>
                      <option value="transporte">Transporte</option>
                      <option value="logistica">Logística</option>
                      <option value="alquiler">Alquiler</option>
                      <option value="concesionaria">Concesionaria</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Persona de Contacto</label>
                  <input
                    type="text"
                    value={formGrupo.contacto_nombre}
                    onChange={(e) => setFormGrupo({ ...formGrupo, contacto_nombre: e.target.value })}
                    placeholder="Juan Perez (Gerente de Flota)"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Teléfono</label>
                    <input
                      type="text"
                      value={formGrupo.telefono}
                      onChange={(e) => setFormGrupo({ ...formGrupo, telefono: e.target.value })}
                      placeholder="11 2345-6789"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Email</label>
                    <input
                      type="email"
                      value={formGrupo.contacto_email}
                      onChange={(e) => setFormGrupo({ ...formGrupo, contacto_email: e.target.value })}
                      placeholder="flota@empresa.com"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalNuevoGrupo(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold"
                  >
                    Crear Empresa
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Nueva Recompensa */}
      <AnimatePresence>
        {modalNuevaRecompensa && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-black text-2xl uppercase tracking-tight">Nueva Recompensa</h3>
                <button onClick={() => setModalNuevaRecompensa(false)} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCrearRecompensa} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Nombre del Premio *</label>
                  <input
                    required
                    type="text"
                    value={formRecompensa.nombre}
                    onChange={(e) => setFormRecompensa({ ...formRecompensa, nombre: e.target.value })}
                    placeholder="Lavado de Motor Bonificado"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Puntos Necesarios</label>
                  <input
                    type="number"
                    value={formRecompensa.puntos_necesarios}
                    onChange={(e) => setFormRecompensa({ ...formRecompensa, puntos_necesarios: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Descripción</label>
                  <textarea
                    rows={2}
                    value={formRecompensa.descripcion}
                    onChange={(e) => setFormRecompensa({ ...formRecompensa, descripcion: e.target.value })}
                    placeholder="Incluye desengrase y abrillantado."
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalNuevaRecompensa(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
                  >
                    Guardar Premio
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Registrar Canje */}
      <AnimatePresence>
        {modalNuevoCanje && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-black text-2xl uppercase tracking-tight">Registrar Canje</h3>
                <button onClick={() => setModalNuevoCanje(false)} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRealizarCanje} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Seleccionar Vehículo / Cliente</label>
                  <select
                    required
                    value={formCanje.auto_id}
                    onChange={(e) => setFormCanje({ ...formCanje, auto_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
                  >
                    <option value="">Elegir auto...</option>
                    {autos.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.patente} - {a.marca} {a.modelo} ({a.puntos || 0} pts) - {a.nombre_titular}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Seleccionar Recompensa</label>
                  <select
                    required
                    value={formCanje.recompensa_id}
                    onChange={(e) => setFormCanje({ ...formCanje, recompensa_id: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white"
                  >
                    <option value="">Elegir premio...</option>
                    {recompensas.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.nombre} ({r.puntos_necesarios} pts)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalNuevoCanje(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
                  >
                    Confirmar Canje
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
