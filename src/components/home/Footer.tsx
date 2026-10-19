import React from 'react';
import { Phone, MapPin, Clock, Instagram, Facebook, Shield, Car } from 'lucide-react';
import { LOGO_URL } from './Navbar';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-xl bg-slate-950 border border-white/10">
                <img src={LOGO_URL} alt="JL Lubricentro" className="h-9 w-auto invert" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight uppercase text-white">
                JL Lubricentro
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Más de 20 años brindando servicios de mantenimiento automotriz con calidad, confianza y profesionalismo. Tu auto en buenas manos.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Instagram JL Lubricentro"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Facebook JL Lubricentro"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={() => onNavigate('/PanelAdmin')}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-500 hover:text-red-400 transition-colors"
                title="Panel de administración"
              >
                <Shield className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Productos / Catálogo (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Productos & Repuestos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/Productos')}
                  className="hover:text-white transition-colors"
                >
                  Lubricantes sintéticos & minerales
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/Productos')}
                  className="hover:text-white transition-colors"
                >
                  Filtros de aceite, aire y habitáculo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/Productos')}
                  className="hover:text-white transition-colors"
                >
                  Líquidos refrigerantes y orgánicos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/Productos')}
                  className="hover:text-white transition-colors"
                >
                  Fluidos para frenos DOT 4 y DOT 5.1
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/Productos')}
                  className="hover:text-white transition-colors"
                >
                  Aditivos de inyección y combustible
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/Productos')}
                  className="hover:text-white transition-colors"
                >
                  Lámparas, escobillas y accesorios
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacto (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Contacto
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Av. Bartolomé Mitre 1592, Florida, Vicente López, Buenos Aires</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/5491127963982" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  +54 9 11 2796-3982
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/MiLubricentro')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-xs font-bold hover:bg-red-600/30 transition-colors"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Portal Mi Lubricentro</span>
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Horarios (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Horarios
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-white block font-medium">Lunes a Viernes</span>
                <span className="text-slate-400">8:00 - 18:00</span>
              </div>
              <div>
                <span className="text-white block font-medium">Sábados</span>
                <span className="text-slate-400">8:30 - 13:00</span>
              </div>
              <div>
                <span className="text-slate-500 block font-medium">Domingos</span>
                <span className="text-slate-500">Cerrado</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} JL Lubricentro. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>made by kini studio.</span>
            <span>·</span>
            <button
              onClick={() => onNavigate('/PanelAdmin')}
              className="text-slate-500 hover:text-slate-400"
            >
              Acceso Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
