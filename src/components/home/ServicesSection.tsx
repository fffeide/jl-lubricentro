import React, { useState } from 'react';
import { 
  Droplet, 
  Filter, 
  Thermometer, 
  Disc, 
  Lightbulb, 
  Cpu, 
  Sparkles, 
  Activity, 
  ArrowUpRight,
  CheckCircle2,
  X
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  badge: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  borderHover: string;
  bgGrad: string;
  iconBg: string;
  details: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'aceite',
    name: 'Cambio de Aceite',
    badge: 'Express · con filtro',
    desc: 'Vaciado por gravedad o aspiración, cambio de arandela de tapón y aceite homologado según especificación del fabricante.',
    icon: Droplet,
    color: 'text-blue-400',
    borderHover: 'hover:border-blue-500/50',
    bgGrad: 'group-hover:from-blue-600/10',
    iconBg: 'bg-blue-600/20 text-blue-400',
    details: ['Aceite mineral, semisintético o 100% sintético', 'Inspección de cárter y tapón', 'Reinicio de aviso de tablero', 'Tarjeta física y digital Mi Lubricentro']
  },
  {
    id: 'filtros',
    name: 'Filtros Premium',
    badge: 'Aire, aceite y combustible',
    desc: 'Reemplazo de filtros de aceite, aire de motor, combustible y habitáculo/polen para cuidar la inyección y el aire que respirás.',
    icon: Filter,
    color: 'text-amber-400',
    borderHover: 'hover:border-amber-500/50',
    bgGrad: 'group-hover:from-amber-600/10',
    iconBg: 'bg-amber-600/20 text-amber-400',
    details: ['Filtros Mann, Fram, Mahle y originales', 'Limpieza profunda de portafiltro', 'Desinfección de conducto de habitáculo']
  },
  {
    id: 'refrigerantes',
    name: 'Refrigerantes',
    badge: 'Anticongelante · control térmico',
    desc: 'Purga, limpieza de circuito y reposición de líquido refrigerante orgánico (OAT) o inorgánico con agua desmineralizada.',
    icon: Thermometer,
    color: 'text-cyan-400',
    borderHover: 'hover:border-cyan-500/50',
    bgGrad: 'group-hover:from-cyan-600/10',
    iconBg: 'bg-cyan-600/20 text-cyan-400',
    details: ['Medición con refractómetro', 'Detección de pérdidas en mangueras', 'Antioxidante y anticorrosivo']
  },
  {
    id: 'frenos',
    name: 'Sistema de Frenos',
    badge: 'Líquido DOT 3/4/5.1',
    desc: 'Comprobación de humedad y punto de ebullición del líquido de frenos. Purga por presión y reemplazo completo.',
    icon: Disc,
    color: 'text-red-400',
    borderHover: 'hover:border-red-500/50',
    bgGrad: 'group-hover:from-red-600/10',
    iconBg: 'bg-red-600/20 text-red-400',
    details: ['Fluidos Bosch y Pentosin', 'Control de desgaste de pastillas y discos', 'Purga de las 4 ruedas']
  },
  {
    id: 'iluminacion',
    name: 'Iluminación',
    badge: 'Halógenas y LED',
    desc: 'Cambio de lámparas quemadas en alta, baja, posición, freno y marcha atrás con calibración de altura de haz de luz.',
    icon: Lightbulb,
    color: 'text-yellow-400',
    borderHover: 'hover:border-yellow-500/50',
    bgGrad: 'group-hover:from-yellow-600/10',
    iconBg: 'bg-yellow-600/20 text-yellow-400',
    details: ['Lámparas Osram y Philips', 'Kits LED Canbus sin error en tablero', 'Reemplazo en el acto']
  },
  {
    id: 'cajas',
    name: 'Cajas Automáticas',
    badge: 'ATF / CVT · todas las marcas',
    desc: 'Servicio y mantenimiento de transmisiones automáticas, secuenciales y CVT con fluidos específicos de alta viscosidad.',
    icon: Cpu,
    color: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/50',
    bgGrad: 'group-hover:from-emerald-600/10',
    iconBg: 'bg-emerald-600/20 text-emerald-400',
    details: ['Normas Dexron, Mercon, CVT Fluid', 'Verificación de nivel a temperatura de servicio', 'Cambio de filtro de cárter de caja']
  },
  {
    id: 'limpieza',
    name: 'Limpieza Auto',
    badge: 'Ceras, shampoos y aromas',
    desc: 'Cuidado estético integral, aditivos lavaparabrisas, siliconas sin solventes y fragancias exclusivas para el habitáculo.',
    icon: Sparkles,
    color: 'text-purple-400',
    borderHover: 'hover:border-purple-500/50',
    bgGrad: 'group-hover:from-purple-600/10',
    iconBg: 'bg-purple-600/20 text-purple-400',
    details: ['Líquido limpia parabrisas anticongelante', 'Silicona perfumada mate/brillo', 'Shampoo pH neutro para carrocería']
  },
  {
    id: 'diagnostico',
    name: 'Diagnóstico',
    badge: 'Escáner · asesoramiento técnico',
    desc: 'Lectura de códigos de falla OBD2, inspección de fugas en fosa y chequeo preventivo de 15 puntos clave del vehículo.',
    icon: Activity,
    color: 'text-slate-300',
    borderHover: 'hover:border-slate-400/50',
    bgGrad: 'group-hover:from-slate-600/10',
    iconBg: 'bg-slate-700/40 text-slate-300',
    details: ['Escaneo computarizado de motor', 'Chequeo de nivel de caja, diferencial y dirección', 'Revisión ocular de correas y tensores']
  }
];

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="servicios" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider">
            Servicios Profesionales
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-white leading-tight">
            Todo lo que tu auto{' '}
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
              necesita
            </span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Atención minuciosa con equipamiento de taller especializado para mantener el rendimiento y la vida útil de tu motor.
          </p>
        </div>

        {/* 8 Compact Service Cards Grid (2x4 mobile / 4 cols desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`group relative p-6 rounded-2xl bg-white/5 bg-gradient-to-br ${srv.bgGrad} to-transparent border border-white/10 ${srv.borderHover} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  {/* Top Bar with Icon and Action Arrow */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${srv.iconBg} transition-transform duration-300 group-hover:rotate-6`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="p-1 rounded-full text-slate-500 group-hover:text-white group-hover:bg-white/10 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-white mb-1 group-hover:text-red-400 transition-colors">
                    {srv.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-400 mb-3">
                    {srv.badge}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-white transition-colors">
                  <span>Ver detalles</span>
                  <span className="font-bold">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Service Details */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-6">
              
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className={`p-3.5 rounded-2xl ${selectedService.iconBg}`}>
                  {React.createElement(selectedService.icon, { className: 'w-7 h-7' })}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight text-white">
                    {selectedService.name}
                  </h3>
                  <span className="text-xs font-bold text-slate-400">
                    {selectedService.badge}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedService.desc}
              </p>

              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Qué incluye este servicio:
                </div>
                {selectedService.details.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4">
                <a
                  href={`https://wa.me/5491127963982?text=Hola!%20Quería%20consultar%20por%20el%20servicio%20de%20${encodeURIComponent(selectedService.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider text-center shadow-lg shadow-red-600/30 transition-all"
                >
                  Consultar por WhatsApp
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cerrar
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
