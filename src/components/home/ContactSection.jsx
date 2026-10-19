import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';

const EASE_EXPO_OUT = [0.16, 1, 0.3, 1];

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Teléfono / WhatsApp',
      value: '+54 9 11 2796-3982',
      link: 'https://wa.me/5491127963982',
      action: 'Enviar mensaje',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      label: 'Dirección',
      value: 'Av. Mitre 1592, Florida',
      subvalue: 'Vicente López, Buenos Aires',
      link: 'https://maps.google.com/?q=Av.+Mitre+1592,+Florida,+Vicente+Lopez',
      action: 'Cómo llegar',
      gradient: 'from-red-500 to-rose-500',
    },
    {
      icon: Clock,
      label: 'Horarios de Atención',
      value: 'Lun a Vie: 8:00 a 18:00',
      subvalue: 'Sábados: 8:30 a 13:00',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <section id="contacto" className="relative py-16 sm:py-28 overflow-hidden bg-slate-950">
      {/* Ambient gradient blobs */}
      <motion.div
        animate={{ y: [0, -25, 0], rotate: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut' }}
        className="absolute top-20 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 13, ease: 'easeInOut' }}
        className="absolute bottom-20 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_EXPO_OUT }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/30 text-red-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
            <MessageCircle className="w-3.5 h-3.5" />
            Contacto
          </span>
          <h2 className="font-display font-extrabold uppercase text-white mt-5 mb-4 leading-[1.05] text-3xl sm:text-5xl">
            Visitanos o{' '}
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-green-400 bg-clip-text text-transparent">
              escribinos
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Estamos listos para atenderte. Atendemos por orden de llegada, sin turno previo.
            Consultanos disponibilidad de productos o cualquier duda que tengas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Cards */}
          <div className="space-y-4">
            {contactInfo.map((item, i) => {
              const Wrapper = item.link ? motion.a : motion.div;
              return (
                <Wrapper
                  key={item.label}
                  href={item.link}
                  target={item.link ? '_blank' : undefined}
                  rel={item.link ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_EXPO_OUT }}
                  whileHover={{ x: 8 }}
                  className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-all duration-300 overflow-hidden block"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative flex items-center gap-4">
                    <div className={`bg-gradient-to-br ${item.gradient} p-3.5 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shrink-0`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-white font-bold text-lg leading-tight">{item.value}</p>
                      {item.subvalue && (
                        <p className="text-slate-300 text-sm mt-0.5">{item.subvalue}</p>
                      )}
                      {item.action && (
                        <span className="inline-flex items-center gap-1.5 text-green-400 group-hover:text-green-300 font-semibold mt-2 text-sm transition-colors">
                          {item.action}
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      )}
                    </div>
                  </div>
                </Wrapper>
              );
            })}

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/5491127963982"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_EXPO_OUT }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative block bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white overflow-hidden shadow-2xl shadow-green-600/20"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-0.5">¿Tenés alguna consulta?</h3>
                  <p className="text-green-50 text-sm">
                    Escribinos por WhatsApp y te respondemos a la brevedad.
                  </p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </motion.a>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_EXPO_OUT }}
            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/25 rounded-2xl overflow-hidden shadow-xl h-full min-h-[280px] sm:min-h-[450px] transition-all duration-300"
          >
            {/* Map label overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-950/80 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="text-white text-sm font-semibold">Av. Mitre 1592, Florida</span>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.4847825547824!2d-58.50088492346875!3d-34.52574725293855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb1d0df8e7911%3A0x8c9d0ab7f3e4c3a2!2sAv.%20Bartolom%C3%A9%20Mitre%201592%2C%20B1602%20Florida%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1699999999999!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '280px', filter: 'invert(0.9) hue-rotate(180deg) brightness(0.9) contrast(0.9)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación JL Lubricentro"
              className="grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
