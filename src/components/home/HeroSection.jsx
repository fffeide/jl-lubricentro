import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Wrench, Award, Users, ArrowRight } from 'lucide-react';

// Expo-out easing for a smooth, decelerating slide-in
const EASE_EXPO_OUT = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=1920&auto=format&fit=crop"
          alt="Taller de servicio automotriz"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/75 to-slate-900/80" />
      </div>

      {/* Subtle floating shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-20 right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none" />
      

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3">
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/30 blur-xl rounded-full" />
                  <img
                    src="https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/f39437ce8_38b670a7-48cf-4f19-baee-85fdbed98e74.jpg"
                    alt="JL Lubricentro"
                    className="relative h-10 w-auto sm:h-14 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                  
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full text-sm font-bold tracking-wide">
                  JL Lubricentro
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center gap-6">
              
              {['Inicio', 'Nosotros', 'Servicios', 'Contacto'].map((item, i) =>
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-300 hover:text-white transition-colors text-sm font-medium relative group">
                
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-green-600 group-hover:w-full transition-all duration-300" />
                </motion.button>
              )}
              <a
                href="/MiLubricentro"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-105">
                
                Mi Lubricentro
              </a>
            </motion.div>

            {/* Mobile quick access */}
            <a href="/MiLubricentro" className="md:hidden bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-red-600/25 whitespace-nowrap">
              Mi Lubricentro
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Big condensed title — two lines sliding from opposite sides */}
            <h1 className="font-display font-extrabold uppercase text-white leading-[0.95] tracking-tight mb-6 text-4xl sm:text-6xl lg:text-8xl">
              <motion.span
                initial={{ opacity: 0, x: -90 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: EASE_EXPO_OUT }}
                className="block">
                
                Tu auto en
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 90 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE_EXPO_OUT }}
                className="block bg-gradient-to-r from-red-500 via-orange-400 to-green-400 bg-clip-text text-transparent">
                
                buenas manos
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE_EXPO_OUT }}
              className="text-base sm:text-xl text-slate-200 mb-8 sm:mb-10 leading-relaxed max-w-xl">
              
              Servicio de excelencia en mantenimiento automotriz. Cambios de aceite express,
              lubricantes premium y atención personalizada que marca la diferencia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: EASE_EXPO_OUT }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12">
              
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('servicios')}
                className="group bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 text-base sm:px-9 sm:py-4 sm:text-lg font-bold rounded-full shadow-2xl shadow-red-600/30 transition-all flex items-center justify-center gap-2">
                
                Nuestros Servicios
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/5491127963982"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 hover:bg-white/15 backdrop-blur-md border-2 border-white/25 hover:border-white/50 text-white px-6 py-3 text-base sm:px-9 sm:py-4 sm:text-lg font-bold rounded-full transition-all flex items-center justify-center gap-2">
                
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                WhatsApp
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE_EXPO_OUT }}
              className="grid grid-cols-3 gap-3 sm:gap-6">
              
              {[
              { icon: Users, value: '+1000', label: 'Clientes' },
              { icon: Wrench, value: '+6', label: 'Marcas premium' },
              { icon: Award, value: '100%', label: 'Garantía' }].
              map((stat) =>
              <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Content - Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE_EXPO_OUT }}
            className="hidden lg:block">
            
            <div className="space-y-4">
              {[
              { icon: Clock, label: 'Horarios', value: 'Lun-Vie 8:00-18:00', sub: 'Sáb 8:30-13:00', color: 'from-green-600 to-emerald-600', href: null },
              { icon: Phone, label: 'Contacto', value: '+54 9 11 2796-3982', sub: 'Escribinos por WhatsApp', color: 'from-blue-600 to-cyan-600', href: 'https://wa.me/5491127963982' },
              { icon: MapPin, label: 'Ubicación', value: 'Av. Mitre 1592', sub: 'Florida, Vicente López', color: 'from-red-600 to-rose-600', href: 'https://maps.google.com/?q=Av.+Mitre+1592,+Florida,+Vicente+Lopez' }].
              map((item, i) =>
              <motion.a
                key={item.label}
                href={item.href || undefined}
                target={item.href ? '_blank' : undefined}
                rel={item.href ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15, ease: EASE_EXPO_OUT }}
                whileHover={{ x: -8, scale: 1.02 }}
                className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 overflow-hidden block ${item.href ? 'cursor-pointer' : 'cursor-default'}`}>
                
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative flex items-center gap-4">
                    <div className={`bg-gradient-to-br ${item.color} p-3.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white font-bold text-lg">{item.value}</p>
                      <p className="text-slate-300 text-base">{item.sub}</p>
                    </div>
                    {item.href && <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 ml-auto transition-colors" />}
                  </div>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>);
}
