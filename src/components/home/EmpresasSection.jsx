import { motion } from 'framer-motion';
import { Building2, Truck, ArrowRight, BarChart3, Bell, ShieldCheck } from 'lucide-react';

const EASE_EXPO_OUT = [0.16, 1, 0.3, 1];

export default function EmpresasSection() {
  const features = [
    { icon: BarChart3, title: 'Control total de flota', desc: 'Historial de cada vehículo en un solo panel.' },
    { icon: Bell, title: 'Recordatorios', desc: 'Avisos de service para que no se quede ninguno atrás.' },
    { icon: ShieldCheck, title: 'Todo documentado', desc: 'Cada servicio registrado con productos y fechas.' },
  ];

  return (
    <section id="empresas" className="relative py-16 sm:py-28 overflow-hidden bg-slate-950">
      {/* Ambient blobs */}
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="absolute top-20 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_EXPO_OUT }}
              className="inline-flex items-center gap-2 bg-amber-600/15 border border-amber-600/30 text-amber-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              <Truck className="w-3.5 h-3.5" />
              Empresas y Flotas
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO_OUT }}
              className="font-display font-extrabold uppercase text-white mt-5 mb-6 leading-[1.05] text-3xl sm:text-5xl"
            >
              ¿Tenés una{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                empresa
              </span>{' '}
              con vehículos?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_EXPO_OUT }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              Llevá el mantenimiento de toda tu flota a JL Lubricentro. Centralizamos el
              historial de servicios, recordatorios y documentación de cada vehículo en
              un portal exclusivo para empresas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_EXPO_OUT }}
            >
              <a
                href="/empresas"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-6 py-3 rounded-full font-bold text-base sm:px-8 sm:py-4 sm:text-lg shadow-2xl shadow-amber-600/25 transition-all hover:scale-105"
              >
                Conocer más
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right: Feature cards */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_EXPO_OUT }}
                whileHover={{ x: -6 }}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-amber-600/30 rounded-2xl p-6 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="bg-gradient-to-br from-amber-600 to-orange-600 p-3.5 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{f.title}</h3>
                    <p className="text-slate-400 text-sm mt-0.5">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Highlight card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE_EXPO_OUT }}
              className="relative bg-gradient-to-br from-amber-600/15 to-orange-600/10 border border-amber-600/30 rounded-2xl p-6 overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3.5 rounded-xl shadow-lg shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">Portal exclusivo para empresas</p>
                  <p className="text-amber-200/80 text-sm mt-0.5">Roles para encargados y choferes · acceso personalizado</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
