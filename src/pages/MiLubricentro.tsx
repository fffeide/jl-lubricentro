import React, { useState, useEffect } from 'react';
import { ArrowLeft, Car, Sparkles, LogOut, Calendar, Award, History, Clock, CheckCircle2, ShieldAlert, Phone, User, ExternalLink, HelpCircle } from 'lucide-react';
import { LOGO_URL } from '../components/home/Navbar';
import { BetaBadge } from '../components/BetaBadge';
import { normalizarPatente } from '../lib/familias';
import { normalizarNombre, primerNombre } from '../lib/nombres';
import { getAutoByPatente, getServiciosByAuto, addAuto, updateAuto } from '../lib/db';
import { Auto, Servicio } from '../lib/types';

interface MiLubricentroProps {
  onNavigate: (path: string) => void;
}

export const MiLubricentro: React.FC<MiLubricentroProps> = ({ onNavigate }) => {
  const [tab, setTab] = useState<'ingresar' | 'registrarse'>('ingresar');
  const [patenteInput, setPatenteInput] = useState('');
  
  // Registration fields
  const [regNombre, setRegNombre] = useState('');
  const [regPatente, setRegPatente] = useState('');
  const [regMarca, setRegMarca] = useState('');
  const [regModelo, setRegModelo] = useState('');
  const [regTelefono, setRegTelefono] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active Session state
  const [currentAuto, setCurrentAuto] = useState<Auto | null>(null);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [clienteNombre, setClienteNombre] = useState<string>('');

  useEffect(() => {
    // 1. Check URL query ?patente=XXX for auto-login
    const params = new URLSearchParams(window.location.search);
    const urlPatente = params.get('patente');

    if (urlPatente) {
      const clean = normalizarPatente(urlPatente);
      loginWithPatente(clean);
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    // 2. Check localStorage
    const saved = localStorage.getItem('jl_lubricentro_sesion');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.patente) {
          loginWithPatente(parsed.patente);
        }
      } catch (e) {
        localStorage.removeItem('jl_lubricentro_sesion');
      }
    }
  }, []);

  const loginWithPatente = async (plate: string) => {
    setLoading(true);
    setError(null);
    try {
      const auto = await getAutoByPatente(plate);
      if (!auto) {
        setError("No encontramos ningún vehículo con esa patente. Si es tu primera vez, usá 'Registrarse'.");
        setLoading(false);
        return;
      }

      setCurrentAuto(auto);
      const name = auto.nombre_titular || 'Cliente';
      setClienteNombre(name);

      localStorage.setItem('jl_lubricentro_sesion', JSON.stringify({
        patente: auto.patente,
        nombre: name,
        esNuevo: false
      }));

      if (auto.id) {
        const srvs = await getServiciosByAuto(auto.id);
        setServicios(srvs);
      }
    } catch (err) {
      setError('Error al consultar los datos. Por favor intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleIngresar = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalizarPatente(patenteInput);
    if (!clean) {
      setError('Ingresá la patente del vehículo.');
      return;
    }
    loginWithPatente(clean);
  };

  const handleRegistrarse = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPlate = normalizarPatente(regPatente);
    if (!cleanPlate || !regMarca.trim() || !regModelo.trim() || !regNombre.trim()) {
      setError('Por favor completá los campos obligatorios.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const existing = await getAutoByPatente(cleanPlate);
      if (existing) {
        setError('Ya existe un vehículo registrado con esa patente. Usá la solapa "Ingresar".');
        setLoading(false);
        return;
      }

      const cleanName = normalizarNombre(regNombre);
      const newAutoId = await addAuto({
        patente: cleanPlate,
        marca: regMarca.trim(),
        modelo: regModelo.trim(),
        nombre_titular: cleanName,
        telefono_titular: regTelefono.trim(),
        puntos: 0,
        datos_completados: true
      });

      const freshAuto: Auto = {
        id: newAutoId,
        patente: cleanPlate,
        marca: regMarca.trim(),
        modelo: regModelo.trim(),
        nombre_titular: cleanName,
        telefono_titular: regTelefono.trim(),
        puntos: 0
      };

      setCurrentAuto(freshAuto);
      setClienteNombre(cleanName);
      setServicios([]);

      localStorage.setItem('jl_lubricentro_sesion', JSON.stringify({
        patente: cleanPlate,
        nombre: cleanName,
        esNuevo: true
      }));
    } catch (err) {
      setError('Error al registrar el vehículo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jl_lubricentro_sesion');
    setCurrentAuto(null);
    setServicios([]);
    setClienteNombre('');
    setPatenteInput('');
  };

  // Google Calendar link generator
  const getGoogleCalendarUrl = (auto: Auto, srv?: Servicio) => {
    const title = encodeURIComponent(`Cambio de aceite - ${auto.patente} (JL Lubricentro)`);
    const dateStr = srv?.proximo_service_fecha 
      ? srv.proximo_service_fecha.replace(/-/g, '')
      : '20261015';
    const dates = `${dateStr}T083000/${dateStr}T123000`;
    const details = encodeURIComponent(
      `<b>Vehículo:</b> ${auto.marca} ${auto.modelo}<br><b>Patente:</b> ${auto.patente}<br><b>Kilometraje actual:</b> ${auto.kilometraje_actual || 'N/A'}<br><b>Próximo service:</b> ${srv?.proximo_service_km || '10.000'} km<br><br>Recordatorio generado por JL Lubricentro.`
    );
    const location = encodeURIComponent('JL Lubricentro, Av. Bartolomé Mitre 1592, Vicente López, Provincia de Buenos Aires');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-red-600 selection:text-white pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-3.5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver a inicio</span>
          </button>

          <div className="flex items-center gap-2.5">
            <img src={LOGO_URL} alt="JL Lubricentro" className="h-7 w-auto invert" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-base uppercase text-white">Mi Lubricentro</span>
                <BetaBadge />
              </div>
              <span className="text-[10px] text-slate-400">
                {currentAuto ? `Hola, ${primerNombre(clienteNombre)}` : 'Tu panel digital'}
              </span>
            </div>
          </div>

          {currentAuto ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          ) : (
            <div className="w-16" />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        
        {!currentAuto ? (
          /* PANTALLA DE ACCESO (Si no hay sesión) */
          <div className="max-w-md mx-auto p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
            
            <div className="text-center space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-red-600/20 via-orange-600/20 to-emerald-600/20 border border-red-500/30 text-white w-fit mx-auto">
                <Car className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight text-white">
                Mi Lubricentro
              </h2>
              <p className="text-xs text-slate-400">
                Historial de servicios de tu vehículo
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-900 border border-white/10 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => { setTab('ingresar'); setError(null); }}
                className={`py-2.5 rounded-xl transition-all ${
                  tab === 'ingresar'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Ingresar
              </button>
              <button
                onClick={() => { setTab('registrarse'); setError(null); }}
                className={`py-2.5 rounded-xl transition-all ${
                  tab === 'registrarse'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Registrarse
              </button>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {tab === 'ingresar' ? (
              <form onSubmit={handleIngresar} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 text-center">
                    Patente del vehículo
                  </label>
                  <input
                    type="text"
                    value={patenteInput}
                    onChange={(e) => setPatenteInput(e.target.value.toUpperCase())}
                    placeholder="Ej: ABC123 o AB123CD"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-white/20 text-white font-mono font-bold text-center tracking-widest text-lg uppercase placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                    required
                  />
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Ingresá solo la patente para ver tu historial
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Consultando...' : 'Ver mi historial'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegistrarse} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    value={regNombre}
                    onChange={(e) => setRegNombre(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Patente *</label>
                  <input
                    type="text"
                    value={regPatente}
                    onChange={(e) => setRegPatente(e.target.value.toUpperCase())}
                    placeholder="ABC123 o AB123CD"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white font-mono font-bold uppercase text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Marca *</label>
                    <input
                      type="text"
                      value={regMarca}
                      onChange={(e) => setRegMarca(e.target.value)}
                      placeholder="Ej: Volkswagen"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Modelo *</label>
                    <input
                      type="text"
                      value={regModelo}
                      onChange={(e) => setRegModelo(e.target.value)}
                      placeholder="Ej: Gol Trend"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Teléfono (WhatsApp)</label>
                  <input
                    type="text"
                    value={regTelefono}
                    onChange={(e) => setRegTelefono(e.target.value)}
                    placeholder="Ej: 11 2796-3982"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Registrando...' : 'Registrarme'}
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-white/10 space-y-2 text-center text-xs">
              <a
                href="https://wa.me/5491127963982"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold block"
              >
                Chateá con nuestro asistente por WhatsApp
              </a>
              <button
                onClick={() => onNavigate('/empresas')}
                className="text-slate-400 hover:text-amber-400 block mx-auto text-[11px]"
              >
                ¿Sos empresa? Iniciar sesión acá
              </button>
            </div>

          </div>
        ) : (
          /* PANEL CLIENTE ACTIVO */
          <div className="space-y-6">
            
            {/* Header Card de Vehículo */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/10 via-slate-900 to-slate-950 border border-white/10 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Mi Vehículo
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                      Al día
                    </span>
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
                    {currentAuto.marca} {currentAuto.modelo}
                  </h2>
                  <div className="text-xs text-slate-400 mt-1">
                    Titular: <span className="text-white font-semibold">{currentAuto.nombre_titular || 'Cliente'}</span>
                    {currentAuto.año && ` • ${currentAuto.año}`}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 rounded-2xl bg-slate-900 border border-white/20 text-white font-mono font-black text-lg tracking-widest shadow-inner">
                    {currentAuto.patente}
                  </span>
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-center">
                    <div className="text-[10px] uppercase font-bold text-amber-500">Puntos</div>
                    <div className="text-base font-black leading-none">{currentAuto.puntos || 0}</div>
                  </div>
                </div>
              </div>

              {/* Alert de Próximo Service & Agendar Calendar */}
              {servicios.length > 0 && (
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-emerald-400 tracking-wider">
                        Próximo Service Recomendado
                      </div>
                      <div className="text-sm font-bold text-white">
                        {servicios[0].proximo_service_km ? `${servicios[0].proximo_service_km.toLocaleString('es-AR')} km` : '10.000 km'}
                        {servicios[0].proximo_service_fecha && ` • Estimado: ${servicios[0].proximo_service_fecha}`}
                      </div>
                    </div>
                  </div>

                  <a
                    href={getGoogleCalendarUrl(currentAuto, servicios[0])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all shrink-0"
                  >
                    <span>Agendar en Google Calendar</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Timeline Historial de Servicios */}
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight text-white">
                Historial de Servicios ({servicios.length})
              </h3>

              {servicios.length > 0 ? (
                <div className="space-y-4">
                  {servicios.map((srv, idx) => (
                    <div
                      key={srv.id || idx}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 shadow-xl"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                          {srv.tipo_servicio.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {srv.fecha_servicio}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block">Kilometraje</span>
                          <span className="font-bold text-white text-sm">
                            {srv.kilometraje.toLocaleString('es-AR')} km
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Aceite Usado</span>
                          <span className="font-bold text-amber-400 text-sm">
                            {srv.aceite_usado || 'Especial'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Litros</span>
                          <span className="font-bold text-white text-sm">
                            {srv.litros_aceite ? `${srv.litros_aceite} L` : '4 L'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Filtros</span>
                          <span className="font-bold text-white text-sm">
                            Aceite: {srv.filtro_aceite || 'Sí'}
                          </span>
                        </div>
                      </div>

                      {srv.notas_tecnico && (
                        <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-300">
                          <span className="font-bold text-slate-400 block mb-0.5">Observación del técnico:</span>
                          {srv.notas_tecnico}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 p-6 rounded-2xl bg-white/5 border border-white/10 text-slate-400">
                  <Clock className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm">Aún no hay servicios registrados para este auto.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </main>
    </div>
  );
};
