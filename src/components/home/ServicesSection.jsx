import { motion } from 'framer-motion';
import { Droplets, Filter, Gauge, Thermometer, Lightbulb, Car, Sparkles, Wrench } from 'lucide-react';

const EASE_EXPO_OUT = [0.16, 1, 0.3, 1];

export default function ServicesSection() {
  // Compact cards: icon + name + one key fact
  const services = [
    { icon: Droplets, title: 'Cambio de Aceite', fact: 'Express · con filtro', color: 'from-blue-500 to-blue-600' },
    { icon: Filter, title: 'Filtros Premium', fact: 'Aire, aceite y combustible', color: 'from-amber-500 to-orange-600' },
    { icon: Thermometer, title: 'Refrigerantes', fact: 'Anticongelante · control térmico', color: 'from-cyan-500 to-blue-600' },
    { icon: Gauge, title: 'Sistema de Frenos', fact: 'Líquido DOT 3/4/5.1', color: 'from-red-500 to-rose-600' },
    { icon: Lightbulb, title: 'Iluminación', fact: 'Halógenas y LED', color: 'from-yellow-500 to-amber-500' },
    { icon: Car, title: 'Cajas Automáticas', fact: 'ATF / CVT · todas las marcas', color: 'from-green-600 to-emerald-600' },
    { icon: Sparkles, title: 'Limpieza Auto', fact: 'Ceras, shampoos y aromas', color: 'from-purple-500 to-pink-600' },
    { icon: Wrench, title: 'Diagnóstico', fact: 'Escáner · asesoramiento técnico', color: 'from-slate-600 to-slate-700' },
  ];

  return (
    <section id="servicios" className="relative py-16 sm:py-28 bg-slate-950 overflow-hidden">
      {/* Background accents */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_EXPO_OUT }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/20 to-green-600/20 border border-white/10 text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5">
            Servicios Profesionales
          </span>
          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl text-white mb-4 tracking-tight">
            Todo lo que tu auto{' '}
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-green-400 bg-clip-text text-transparent">
              necesita
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Servicios rápidos, productos premium y atención de primera. Cada trabajo con garantía de calidad.
          </p>
        </motion.div>

        {/* Compact cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: EASE_EXPO_OUT }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.12] transition-opacity duration-300`} />
              <div className="relative">
                <div className={`inline-flex bg-gradient-to-br ${service.color} w-12 h-12 sm:w-14 sm:h-14 rounded-2xl items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-black text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-green-400 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-snug">{service.fact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
