import React, { useState } from 'react';
import { ArrowLeft, Car, Search, Calendar, Award, ShieldAlert, CheckCircle2, ChevronRight, Clock } from 'lucide-react';
import { LOGO_URL } from '../components/home/Navbar';
import { normalizarPatente } from '../lib/familias';
import { getAutoByPatente, getServiciosByAuto } from '../lib/db';
import { Auto, Servicio } from '../lib/types';

interface ConsultaVehiculoProps {
  onNavigate: (path: string) => void;
}

export const ConsultaVehiculo: React.FC<ConsultaVehiculoProps> = ({ onNavigate }) => {
  const [patente, setPatente] = useState('');
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoEncontrado, setAutoEncontrado] = useState<Auto | null>(null);
  const [servicios, setServicios] = useState<Servicio[]>([]);

  const handleConsultar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanPlate = normalizarPatente(patente);

    if (!cleanPlate) {
      setError('Por favor ingresá la patente de tu vehículo.');
      return;
    }

    setLoading(true);
    try {
      const auto = await getAutoByPatente(cleanPlate);

      if (!auto) {
        setError('No encontramos ningún vehículo con esa patente.');
        setLoading(false);
        return;
      }

      // Validar DNI si está ingresado en el auto
      if (dni.trim() && auto.dni_titular && auto.dni_titular.replace(/\D/g, '') !== dni.replace(/\D/g, '')) {
        setError('Los datos ingresados no coinciden. Verificá la patente y el DNI.');
        setLoading(false);
        return;
      }

      setAutoEncontrado(auto);
      if (auto.id) {
        const srvs = await getServiciosByAuto(auto.id);
        setServicios(srvs);
      }
    } catch (err) {
      setError('Ocurrió un error al consultar el historial. Por favor intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAutoEncontrado(null);
    setServicios([]);
    setPatente('');
    setDni('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-red-600 selection:text-white pb-20">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a inicio</span>
          </button>

          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="JL" className="h-6 w-auto invert" />
            <div className="text-right">
              <div className="text-xs font-bold text-white uppercase tracking-tight">Consultá tu vehículo</div>
              <div className="text-[10px] text-slate-400">Sin necesidad de cuenta</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 space-y-8">
        
        {!autoEncontrado ? (
          <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl space-y-8 max-w-xl mx-auto">
            
            <div className="text-center space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-red-600/20 to-orange-600/20 border border-red-500/30 text-red-500 w-fit mx-auto">
                <Car className="w-8 h-8" />
              </div>
              <h2 className="font-display font-extrabold text-3xl uppercase tracking-tight text-white">
                Historial de tu auto
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Ingresá la patente y tu DNI para ver todos los servicios realizados.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleConsultar} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Patente del vehículo
                </label>
                <input
                  type="text"
                  value={patente}
                  onChange={(e) => setPatente(e.target.value.toUpperCase())}
                  placeholder="Ej: ABC123 o AB123CD"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-white/20 text-white font-mono font-bold text-center tracking-widest text-lg uppercase placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  DNI del titular (opcional)
                </label>
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  placeholder="Número de documento sin puntos"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/20 text-white text-center text-sm placeholder-slate-600 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Buscando datos...' : 'Ver mi historial'}
              </button>
            </form>

            <div className="pt-4 text-center">
              <button
                onClick={() => onNavigate('/MiLubricentro')}
                className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
              >
                ¿Querés gestionar tu auto y puntos? Entrá a Mi Lubricentro →
              </button>
            </div>

          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header info card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/10 via-slate-900 to-slate-950 border border-white/10 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Vehículo registrado
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
                    {autoEncontrado.marca} {autoEncontrado.modelo}
                  </h2>
                  <div className="text-xs text-slate-400 mt-1">
                    Titular: <span className="text-white font-semibold">{autoEncontrado.nombre_titular || 'No informado'}</span>
                    {autoEncontrado.año && ` • Año ${autoEncontrado.año}`}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <span className="px-4 py-2 rounded-xl bg-slate-900 border border-white/20 text-white font-mono font-black text-base tracking-widest shadow-inner">
                    {autoEncontrado.patente}
                  </span>
                  {autoEncontrado.puntos !== undefined && (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      <span>{autoEncontrado.puntos} Puntos</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block">Kilometraje</span>
                  <span className="font-bold text-white text-sm">
                    {autoEncontrado.kilometraje_actual ? `${autoEncontrado.kilometraje_actual.toLocaleString('es-AR')} km` : 'Sin registrar'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-slate-400 block">Aceite recomendado</span>
                  <span className="font-bold text-amber-400 text-sm">
                    {autoEncontrado.aceite_recomendado || 'Shell 10W40'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block">Filtro</span>
                  <span className="font-bold text-white text-sm">
                    {autoEncontrado.filtro_recomendado || 'Mann / Fram'}
                  </span>
                </div>
              </div>
            </div>

            {/* Historial de servicios */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-white">
                  Historial de Servicios ({servicios.length})
                </h3>
                <button
                  onClick={handleReset}
                  className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Nueva consulta
                </button>
              </div>

              {servicios.length > 0 ? (
                <div className="space-y-4">
                  {servicios.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-xl"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                          {srv.tipo_servicio.replace('_', ' ')}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{srv.fecha_servicio}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block">Kilometraje</span>
                          <span className="font-bold text-white">{srv.kilometraje.toLocaleString('es-AR')} km</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Aceite Usado</span>
                          <span className="font-bold text-amber-400">{srv.aceite_usado || 'Especial'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Filtro Aceite</span>
                          <span className="font-bold text-white">{srv.filtro_aceite || 'Sí'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Próximo Service</span>
                          <span className="font-bold text-emerald-400">
                            {srv.proximo_service_km ? `${srv.proximo_service_km.toLocaleString('es-AR')} km` : '10.000 km'}
                          </span>
                        </div>
                      </div>

                      {srv.notas_tecnico && (
                        <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-300">
                          <span className="font-bold text-slate-400 block mb-0.5">Nota técnica:</span>
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
