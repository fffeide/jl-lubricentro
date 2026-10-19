import { motion } from 'framer-motion';
import { CheckCircle, Clock, Shield, Star, CreditCard, ArrowRight } from 'lucide-react';
import LocalPhotoSlider from './LocalPhotoSlider';

const EASE_EXPO_OUT = [0.16, 1, 0.3, 1];

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: 'Servicio Rápido',
      description: 'Atención ágil y eficiente. Tu tiempo es valioso y lo sabemos.',
      gradient: 'from-red-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Garantía Total',
      description: 'Todos nuestros trabajos cuentan con respaldo y garantía.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Star,
      title: 'Primeras Marcas',
      description: 'Trabajamos exclusivamente con productos de calidad certificada.',
      gradient: 'from-amber-500 to-yellow-500',
    },
    {
      icon: CreditCard,
      title: 'Ticket Car',
      description: 'Aceptamos Ticket Car y múltiples medios de pago.',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  const stats = [
    { value: '+20', label: 'Años de experiencia' },
    { value: '+6', label: 'Marcas premium' },
    { value: '+1000', label: 'Clientes satisfechos' },
  ];

  return (
    <section id="nosotros" className="relative py-16 sm:py-28 overflow-hidden bg-slate-950">
      {/* Ambient gradient blobs */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
        className="absolute top-10 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        className="absolute bottom-10 -right-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_EXPO_OUT }}
              className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/30 text-red-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              ¿Por qué elegirnos?
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO_OUT }}
              className="font-display font-extrabold uppercase text-white mt-5 mb-6 leading-[1.05] text-3xl sm:text-5xl"
            >
              La confianza es nuestra{' '}
              <span className="bg-gradient-to-r from-red-500 via-orange-400 to-green-400 bg-clip-text text-transparent">
                carta de presentación
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_EXPO_OUT }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg"
            >
              En JL Lubricentro nos diferenciamos por ofrecer un servicio integral,
              combinando experiencia, profesionalismo y productos de primera línea.
              Cada vehículo recibe la atención que merece.
            </motion.p>

            <div className="space-y-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_EXPO_OUT }}
                  whileHover={{ x: 6 }}
                  className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/25 rounded-2xl p-5 transition-all duration-300 overflow-hidden cursor-default"
                >
                  {/* Hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${benefit.gradient} p-3 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0`}>
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg">{benefit.title}</h3>
                      <p className="text-slate-400 text-sm mt-1">{benefit.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats & Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_EXPO_OUT }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <LocalPhotoSlider />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: EASE_EXPO_OUT }}
                      className="text-center group cursor-default"
                    >
                      <span className="font-display font-extrabold text-3xl sm:text-4xl bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-green-400 transition-all duration-300">
                        {stat.value}
                      </span>
                      <p className="text-white/70 text-xs mt-1 leading-tight">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="absolute -top-6 -left-6 bg-gradient-to-br from-white to-slate-100 rounded-2xl shadow-2xl p-4 border border-white/50"
            >
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-lg shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Servicio Garantizado</p>
                  <p className="text-sm text-slate-500">100% satisfacción</p>
                </div>
              </div>
            </motion.div>

            {/* Floating accent shape */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute -bottom-5 -right-5 w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl rotate-12 opacity-20 blur-xl pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
