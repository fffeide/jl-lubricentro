import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Building2, 
  Truck, 
  LogOut, 
  Plus, 
  ShieldCheck, 
  Car, 
  Calendar, 
  ExternalLink,
  MessageCircle,
  Clock,
  Wrench,
  Search,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';
import { LOGO_URL } from '../components/home/Navbar';
import { useAuth } from '../lib/AuthContext';
import { getAutos, addAuto, getAllServicios } from '../lib/db';
import { Auto, Servicio } from '../lib/types';
import { normalizarPatente } from '../lib/familias';

interface PortalEmpresaProps {
  onNavigate: (path: string) => void;
}

export const PortalEmpresa: React.FC<PortalEmpresaProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, loginWithGoogle, logout } = useAuth();
  const [autosFlota, setAutosFlota] = useState<Auto[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [modalNuevoAuto, setModalNuevoAuto] = useState(false);
  const [formAuto, setFormAuto] = useState({
    patente: '',
    marca: '',
    modelo: '',
    año: 2022,
    kilometraje_actual: 0,
    nombre_titular: '',
    telefono_titular: ''
  });

  const loadFlota = async () => {
    setLoading(true);
    try {
      const [todosAutos, todosServicios] = await Promise.all([
        getAutos(),
        getAllServicios()
      ]);
      // Vehículos marcados como empresa o en flota
      const flota = todosAutos.filter(a => a.es_vehiculo_empresa);
      setAutosFlota(flota.length > 0 ? flota : todosAutos.slice(0, 6)); // fallback to sample if none marked
      setServicios(todosServicios);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFlota();
  }, []);

  const handleAgregarAutoFlota = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuto.patente || !formAuto.marca || !formAuto.modelo) {
      alert('Completá patente, marca y modelo');
      return;
    }
    try {
      await addAuto({
        patente: normalizarPatente(formAuto.patente),
        marca: formAuto.marca,
        modelo: formAuto.modelo,
        año: Number(formAuto.año),
        kilometraje_actual: Number(formAuto.kilometraje_actual),
        nombre_titular: formAuto.nombre_titular || 'Chofer Asignado',
        telefono_titular: formAuto.telefono_titular,
        es_vehiculo_empresa: true,
        puntos: 0
      });
      setModalNuevoAuto(false);
      setFormAuto({
        patente: '',
        marca: '',
        modelo: '',
        año: 2022,
        kilometraje_actual: 0,
        nombre_titular: '',
        telefono_titular: ''
      });
      await loadFlota();
    } catch (err) {
      alert('Error agregando vehículo');
    }
  };

  const filteredFlota = autosFlota.filter(a => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      a.patente.toLowerCase().includes(q) ||
      a.marca.toLowerCase().includes(q) ||
      a.modelo.toLowerCase().includes(q) ||
      (a.nombre_titular && a.nombre_titular.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-amber-500 selection:text-slate-950 pb-20">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/empresas')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Volver a Empresas"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-black text-lg uppercase tracking-tight text-white block leading-none">
                  Portal de Flota Corporativa
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  JL Lubricentro Empresas
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/5491127963982?text=Hola!%20Escribo%20desde%20el%20Portal%20de%20Flotas%20de%20JL%20Lubricentro."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-400 hover:text-white text-xs font-bold transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Soporte Flotas</span>
            </a>

            {isAuthenticated ? (
              <button
                onClick={() => logout()}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-red-400 transition-colors cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => loginWithGoogle()}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase cursor-pointer"
              >
                Acceso Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Banner Hero */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/20 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              <Truck className="w-3 h-3" />
              <span>Flota Corporativa Activa</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
              Gestión y Mantenimiento de Vehículos
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Monitoreá el estado mecánico, kilometraje acumulado y fechas de próximos services de todos los utilitarios y camiones de tu empresa.
            </p>
          </div>

          <button
            onClick={() => setModalNuevoAuto(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-500/20 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Unidad a Flota</span>
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Unidades en Flota</span>
            <div className="font-display font-black text-3xl text-white">
              {autosFlota.length}
            </div>
            <span className="text-[11px] text-amber-400">Activas con seguimiento</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mantenimientos al Día</span>
            <div className="font-display font-black text-3xl text-emerald-400">
              {autosFlota.length}
            </div>
            <span className="text-[11px] text-slate-500">Historial digitalizado</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Turnos sin Espera</span>
            <div className="font-display font-black text-3xl text-blue-400">
              Prioridad
            </div>
            <span className="text-[11px] text-slate-500">Av. Bartolomé Mitre 1592</span>
          </div>
        </div>

        {/* Search & List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar unidad por patente, marca o chofer..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFlota.map(auto => {
              const ultSrv = servicios.find(s => s.auto_id === auto.id);
              return (
                <div
                  key={auto.id}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all space-y-4 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-bold text-lg uppercase text-white tracking-tight">
                          {auto.marca} {auto.modelo}
                        </h4>
                        <div className="text-xs text-slate-400">
                          Chofer: <span className="text-white font-semibold">{auto.nombre_titular || 'Sin asignar'}</span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded bg-black border border-white/20 text-white font-mono font-bold text-xs tracking-wider">
                        {auto.patente}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-black/20 border border-white/5">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Km Actual</span>
                        <span className="text-white font-semibold">{auto.kilometraje_actual ? auto.kilometraje_actual.toLocaleString('es-AR') : '0'} km</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Próximo Service</span>
                        <span className="text-amber-400 font-bold">{ultSrv?.proximo_service_km ? `${ultSrv.proximo_service_km.toLocaleString('es-AR')} km` : '10.000 km'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onNavigate(`/MiLubricentro?patente=${auto.patente}`)}
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 transition-colors cursor-pointer"
                    >
                      Ver Historial Completo
                    </button>

                    <a
                      href={`https://wa.me/5491127963982?text=${encodeURIComponent(`Hola! Necesito coordinar un service para la unidad de flota ${auto.marca} ${auto.modelo} (${auto.patente}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all cursor-pointer"
                      title="Pedir turno prioritario por WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Modal Agregar Unidad */}
      <AnimatePresence>
        {modalNuevoAuto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-black text-2xl uppercase tracking-tight">Agregar Unidad a Flota</h3>
                <button onClick={() => setModalNuevoAuto(false)} className="p-1 rounded-lg hover:bg-white/10 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAgregarAutoFlota} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Patente *</label>
                  <input
                    required
                    type="text"
                    value={formAuto.patente}
                    onChange={(e) => setFormAuto({ ...formAuto, patente: e.target.value.toUpperCase() })}
                    placeholder="AE123CD"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 font-mono font-bold uppercase text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Marca *</label>
                    <input
                      required
                      type="text"
                      value={formAuto.marca}
                      onChange={(e) => setFormAuto({ ...formAuto, marca: e.target.value })}
                      placeholder="Mercedes-Benz, Ford..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Modelo *</label>
                    <input
                      required
                      type="text"
                      value={formAuto.modelo}
                      onChange={(e) => setFormAuto({ ...formAuto, modelo: e.target.value })}
                      placeholder="Sprinter, Transit..."
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Año</label>
                    <input
                      type="number"
                      value={formAuto.año}
                      onChange={(e) => setFormAuto({ ...formAuto, año: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Kilometraje Actual</label>
                    <input
                      type="number"
                      value={formAuto.kilometraje_actual}
                      onChange={(e) => setFormAuto({ ...formAuto, kilometraje_actual: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Chofer o Responsable</label>
                  <input
                    type="text"
                    value={formAuto.nombre_titular}
                    onChange={(e) => setFormAuto({ ...formAuto, nombre_titular: e.target.value })}
                    placeholder="Carlos Gómez"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalNuevoAuto(false)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
                  >
                    Guardar Unidad
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
