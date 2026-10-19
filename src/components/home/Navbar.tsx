import React, { useState, useEffect } from 'react';
import { Menu, X, Car, Shield, Phone, Sparkles } from 'lucide-react';
import { BetaBadge } from '../BetaBadge';

export const LOGO_URL = 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/f39437ce8_38b670a7-48cf-4f19-baee-85fdbed98e74.jpg';

interface NavbarProps {
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50 py-3'
          : 'bg-gradient-to-b from-slate-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => scrollToSection('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-xl border border-white/10 p-1 bg-slate-900 group-hover:border-red-500/40 transition-colors">
              <img
                src={LOGO_URL}
                alt="JL Lubricentro"
                className="h-9 w-auto object-contain invert brightness-95"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight uppercase text-white group-hover:text-red-500 transition-colors">
                  JL Lubricentro
                </span>
                <BetaBadge />
              </div>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Servicio Automotriz & Flotas
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('inicio')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Servicios
            </button>
            <button
              onClick={() => onNavigate('/Productos')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Productos</span>
              <span className="text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded-full">Catálogo</span>
            </button>
            <button
              onClick={() => onNavigate('/empresas')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Empresas
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onNavigate('/consulta')}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Consultar por patente y DNI"
            >
              Consultar Auto
            </button>

            <button
              onClick={() => onNavigate('/MiLubricentro')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-red-500/30"
            >
              <Car className="w-4 h-4" />
              <span>Mi Lubricentro</span>
            </button>

            <button
              onClick={() => onNavigate('/PanelAdmin')}
              className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
              title="Panel de Administración (Dueño)"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onNavigate('/MiLubricentro')}
              className="px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-600/30"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Mi Auto</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-xl bg-white/5 border border-white/10"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10 text-sm">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-left px-3 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('nosotros')}
                className="text-left px-3 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className="text-left px-3 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="text-left px-3 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
              >
                Contacto
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/Productos');
                }}
                className="text-left px-3 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5"
              >
                Productos
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/empresas');
                }}
                className="text-left px-3 py-2 text-amber-400 hover:text-amber-300 rounded-lg hover:bg-white/5"
              >
                Empresas & Flotas
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/MiLubricentro');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-center text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Car className="w-4 h-4" />
                <span>Entrar a Mi Lubricentro</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/consulta');
                }}
                className="w-full py-2 px-4 rounded-xl bg-white/5 text-slate-300 font-semibold text-center text-xs border border-white/10"
              >
                Consulta rápida por patente
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('/PanelAdmin');
                }}
                className="w-full py-2 px-4 rounded-xl bg-slate-800 text-slate-400 font-medium text-center text-xs flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Panel Admin (Dueño)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
