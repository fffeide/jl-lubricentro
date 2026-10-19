import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, MessageCircle, Package, Droplet, Thermometer, Filter, Disc, Sparkles, Wrench, Shield, Layers } from 'lucide-react';
import { LOGO_URL } from '../components/home/Navbar';
import { getProductos } from '../lib/db';
import { Producto, CategoriaProducto } from '../lib/types';
import { formatPesos } from '../lib/utils';

interface ProductosPageProps {
  onNavigate: (path: string) => void;
}

interface CategoryCard {
  id: CategoriaProducto;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderHover: string;
  bgGrad: string;
}

const CATEGORIES: CategoryCard[] = [
  { id: 'lubricantes', name: 'Lubricantes', icon: Droplet, color: 'text-blue-400', borderHover: 'hover:border-blue-500/50', bgGrad: 'from-blue-600/10' },
  { id: 'refrigerantes', name: 'Refrigerantes', icon: Thermometer, color: 'text-cyan-400', borderHover: 'hover:border-cyan-500/50', bgGrad: 'from-cyan-600/10' },
  { id: 'filtros', name: 'Filtros', icon: Filter, color: 'text-slate-300', borderHover: 'hover:border-slate-400/50', bgGrad: 'from-slate-600/10' },
  { id: 'liquido_frenos', name: 'Líquido de Frenos', icon: Disc, color: 'text-red-400', borderHover: 'hover:border-red-500/50', bgGrad: 'from-red-600/10' },
  { id: 'aditivos_limpieza', name: 'Aditivos y Limpieza', icon: Sparkles, color: 'text-purple-400', borderHover: 'hover:border-purple-500/50', bgGrad: 'from-purple-600/10' },
  { id: 'herramientas', name: 'Herramientas', icon: Wrench, color: 'text-orange-400', borderHover: 'hover:border-orange-500/50', bgGrad: 'from-orange-600/10' },
  { id: 'accesorios', name: 'Accesorios', icon: Shield, color: 'text-emerald-400', borderHover: 'hover:border-emerald-500/50', bgGrad: 'from-emerald-600/10' },
];

export const Productos: React.FC<ProductosPageProps> = ({ onNavigate }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoriaProducto | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductos().then(list => {
      setProductos(list);
      setLoading(false);
    });
  }, []);

  const filtered = productos.filter(p => {
    const matchesCat = selectedCategory ? p.categoria === selectedCategory : true;
    const matchesSearch = search 
      ? p.nombre.toLowerCase().includes(search.toLowerCase()) || 
        (p.marca && p.marca.toLowerCase().includes(search.toLowerCase())) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(search.toLowerCase()))
      : true;
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-red-600 selection:text-white pb-20">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-slate-300 hover:text-white"
              aria-label="Volver a inicio"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <img src={LOGO_URL} alt="JL Lubricentro" className="h-7 w-auto invert" />
              <div>
                <h1 className="font-display font-extrabold text-lg sm:text-xl uppercase tracking-tight text-white leading-none">
                  Catálogo de Productos
                </h1>
                <span className="text-[11px] text-emerald-400 font-semibold tracking-wide">
                  Stock permanente
                </span>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/5491127963982?text=Hola!%20Quería%20consultar%20por%20un%20producto."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span className="hidden sm:inline">Consultar por WhatsApp</span>
            <span className="sm:hidden">Consultar</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Search Bar & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-white">
              {selectedCategory 
                ? CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Productos'
                : 'Nuestros Productos'
              }
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Lubricantes oficiales, filtros originales y fluidos de alta gama.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por marca, viscosidad o repuesto..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
        </div>

        {/* Categories Bar / Grid */}
        {!selectedCategory && !search ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const count = productos.filter(p => p.categoria === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-6 rounded-2xl bg-white/5 bg-gradient-to-br ${cat.bgGrad} to-transparent border border-white/10 ${cat.borderHover} text-left transition-all hover:-translate-y-1 hover:shadow-2xl group cursor-pointer`}
                  >
                    <div className={`p-3 rounded-xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform ${cat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-extrabold text-lg uppercase tracking-tight text-white mb-1 group-hover:text-red-400 transition-colors">
                      {cat.name}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {count} {count === 1 ? 'producto' : 'productos'}
                    </div>
                  </button>
                );
              })}

              {/* ¿No encontrás lo que buscás? Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600/10 via-white/5 to-transparent border border-red-500/20 text-left flex flex-col justify-between">
                <div>
                  <div className="p-3 rounded-xl bg-red-600/20 text-red-500 w-fit mb-4">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-lg uppercase tracking-tight text-white mb-1">
                    ¿No encontrás lo que buscás?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Traemos repuestos y aceites específicos por encargo en 24hs.
                  </p>
                </div>
                <a
                  href="https://wa.me/5491127963982?text=Hola!%20Busco%20un%20producto%20específico."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5"
                >
                  <span>Contactar</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearch('');
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a todas las categorías</span>
              </button>
              <span className="text-xs text-slate-400">
                {filtered.length} productos encontrados
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all hover:-translate-y-1 shadow-xl"
                >
                  <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                    <img
                      src={prod.imagen_url || 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80'}
                      alt={prod.nombre}
                      className="w-full h-full object-cover"
                    />
                    {prod.marca && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-blue-400 border border-white/10 uppercase tracking-wider">
                        {prod.marca}
                      </span>
                    )}
                    {prod.stock_disponible !== false ? (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold uppercase">
                        En Stock
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-bold uppercase">
                        Agotado
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-display font-bold text-base uppercase text-white tracking-tight line-clamp-2">
                        {prod.nombre}
                      </h4>
                      {prod.descripcion && (
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          {prod.descripcion}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      {prod.precio_referencia ? (
                        <div className="text-sm font-extrabold text-white">
                          {formatPesos(prod.precio_referencia)}
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400">Consultar precio</div>
                      )}

                      <a
                        href={`https://wa.me/5491127963982?text=Hola!%20Quería%20consultar%20por%20${encodeURIComponent(prod.nombre)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                        title="Consultar por WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <Package className="w-12 h-12 mx-auto text-slate-600" />
                <p className="text-sm">No encontramos productos que coincidan con la búsqueda.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
