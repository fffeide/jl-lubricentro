import { motion } from 'framer-motion';
import { Smartphone, FileCheck, Bell, Shield, ArrowRight } from 'lucide-react';

export default function MiLubricentroSection() {
  return (
    <section id="mi-lubricentro" className="relative py-16 sm:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute top-20 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/30 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Smartphone className="w-4 h-4" />
              Nueva Tecnología
            </motion.div>

            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white mb-6 leading-[1.05] tracking-tight">
              Tu tarjeta de servicio,
              <span className="block bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent mt-2">
                ahora digital
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Olvidate de la tarjeta física. Con <strong className="text-white">Mi Lubricentro</strong>, 
              llevá el historial completo de tu auto en tu celular.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {[
                { icon: FileCheck, text: 'Historial completo de servicios' },
                { icon: Bell, text: 'Alertas cuando necesites service' },
                { icon: Shield, text: 'Toda tu info siempre segura' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-3 rounded-xl">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-slate-200 text-lg font-medium">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="/MiLubricentro"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white px-8 py-5 text-lg font-bold rounded-xl shadow-2xl shadow-red-600/30 transition-all"
            >
              Entrar a Mi Lubricentro
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Phone Frame */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-green-600/30 blur-3xl" />
              
              {/* Phone */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative w-[300px] bg-slate-900 p-2.5 rounded-[3rem] shadow-2xl ring-1 ring-slate-700"
              >
                <div className="relative bg-black rounded-[2.5rem] overflow-hidden shadow-inner ring-1 ring-slate-800">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-28 h-7 bg-black rounded-full" />

                  {/* Screen Content */}
                  <div className="h-[500px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-14 p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <img
                        src="https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/f39437ce8_38b670a7-48cf-4f19-baee-85fdbed98e74.jpg"
                        alt="JL Lubricentro"
                        className="h-8 w-auto invert"
                        style={{ mixBlendMode: 'screen' }}
                      />
                      <div>
                        <p className="text-white font-bold text-sm">Mi Lubricentro</p>
                        <p className="text-slate-400 text-xs">Tu panel digital</p>
                      </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-green-600 p-2 rounded-lg">
                          <FileCheck className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-bold text-sm">Chevrolet Onix</p>
                          <p className="text-slate-400 text-xs">2020 • 45,000 km</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Último servicio</span>
                          <span className="text-white font-semibold">15 Dic 2025</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Aceite usado</span>
                          <span className="text-white font-semibold">Shell 10W40</span>
                        </div>
                      </div>
                    </div>

                    {/* Alert */}
                    <div className="bg-green-600/20 border border-green-600/30 rounded-xl p-3 flex items-center gap-3">
                      <Bell className="w-4 h-4 text-green-400 shrink-0" />
                      <p className="text-green-300 text-xs">
                        <strong>Próximo service:</strong> Febrero 2026
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
