import { Phone, MapPin, Clock, Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const productCategories = [
  'Lubricantes', 'Filtros', 'Refrigerantes', 'Aditivos',
  'Líquido de Frenos', 'Motos', 'Accesorios', 'Herramientas'];


  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/f39437ce8_38b670a7-48cf-4f19-baee-85fdbed98e74.jpg"
                alt="JL Lubricentro"
                className="h-12 w-auto invert"
                style={{ mixBlendMode: 'screen' }} />
              
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Más de 20 años brindando servicios de mantenimiento automotriz 
              con calidad, confianza y profesionalismo.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/jlubricentro/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-red-600 p-2.5 rounded-lg transition-colors">
                
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/jlubricentro/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-red-600 p-2.5 rounded-lg transition-colors">
                
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-lg mb-6">Productos</h3>
            <ul className="space-y-3">
              {productCategories.map((cat) =>
              <li key={cat}>
                  <span className="text-slate-400 hover:text-emerald-400 transition-colors cursor-default">
                    {cat}
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Av. Mitre 1592, Florida,<br />Vicente López, Buenos Aires
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/5491127963982"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 transition-colors">
                  
                  +54 9 11 2796-3982
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-lg mb-6">Horarios</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-slate-400">
                  <p className="font-medium text-white">Lunes a Viernes</p>
                  <p>8:00 a 13:00</p>
                  <p>14:00 a 18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-slate-400">
                  <p className="font-medium text-white">Sábados</p>
                  <p>8:30 a 13:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center sm:text-left">
              © {currentYear} JL Lubricentro. Todos los derechos reservados.
            </p>
            <p className="text-slate-500 text-sm">made by kini studio.

            </p>
          </div>
        </div>
      </div>
    </footer>);
}
