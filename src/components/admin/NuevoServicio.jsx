import React, { useState } from 'react';
import { Settings, Zap, ArrowLeft, X, Plus, Trash2, CheckCircle2, MessageCircle } from 'lucide-react';
import FiltroToggle from './FiltroToggle';
import { addServicio, updateAuto } from '@/lib/db';
import { calcularPuntos } from '@/lib/fidelidad';
import { buildWhatsAppMessage, mensajeBienvenida, abrirWhatsAppWeb } from '@/lib/mensajesWhatsapp';

export default function NuevoServicio({ auto, serviciosPrevios = [], onClose, onGuardado }) {
  const [paso, setPaso] = useState(1);
  const [tipoCaja, setTipoCaja] = useState('manual');

  const hoy = new Date().toISOString().split('T')[0];
  const proximaFechaDefault = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  })();

  const [fechaServicio, setFechaServicio] = useState(hoy);
  const [kilometraje, setKilometraje] = useState(auto.kilometraje_actual || '');
  const [proximoKm, setProximoKm] = useState(auto.kilometraje_actual ? Number(auto.kilometraje_actual) + 10000 : 10000);
  const [proximaFecha, setProximaFecha] = useState(proximaFechaDefault);
  const [tipoServicio, setTipoServicio] = useState('cambio_aceite');

  // Fluidos y filtros
  const [aceiteUsado, setAceiteUsado] = useState(auto.aceite_recomendado || '');
  const [litrosAceite, setLitrosAceite] = useState(4);
  const [filtroAceite, setFiltroAceite] = useState('Sí');
  const [filtroAire, setFiltroAire] = useState('Sí');
  const [filtroCombustible, setFiltroCombustible] = useState('No');
  const [filtroHabitaculo, setFiltroHabitaculo] = useState('Sí');
  const [aceiteCaja, setAceiteCaja] = useState('');

  // Otros productos
  const [nuevoProducto, setNuevoProducto] = useState('');
  const [otrosProductos, setOtrosProductos] = useState([]);

  const [monto, setMonto] = useState('');
  const [notasTecnico, setNotasTecnico] = useState('');
  const [loading, setLoading] = useState(false);
  const [guardadoExito, setGuardadoExito] = useState(false);
  const [whatsAppMsg, setWhatsAppMsg] = useState('');

  const handleKmChange = (val) => {
    const num = Number(val) || 0;
    setKilometraje(val);
    setProximoKm(num + 10000);
  };

  const handleAgregarProducto = () => {
    if (!nuevoProducto.trim()) return;
    setOtrosProductos([...otrosProductos, nuevoProducto.trim()]);
    setNuevoProducto('');
  };

  const handleEliminarProducto = (idx) => {
    setOtrosProductos(otrosProductos.filter((_, i) => i !== idx));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!kilometraje) {
      alert('Por favor ingresá el kilometraje');
      return;
    }

    setLoading(true);
    try {
      const montoNum = Number(monto) || 0;
      const puntosSumar = calcularPuntos(montoNum);

      // Guardar servicio en Firestore
      await addServicio({
        auto_id: auto.id,
        fecha_servicio: fechaServicio,
        kilometraje: Number(kilometraje),
        tipo_servicio: tipoServicio,
        tipo_caja: tipoCaja,
        aceite_usado: aceiteUsado,
        litros_aceite: Number(litrosAceite),
        filtro_aceite: filtroAceite,
        filtro_aire: filtroAire,
        filtro_combustible: filtroCombustible,
        filtro_habitaculo: filtroHabitaculo,
        aceite_caja: tipoCaja === 'automatica' ? aceiteCaja : '',
        otros_productos: otrosProductos,
        proximo_service_km: Number(proximoKm),
        proximo_service_fecha: proximaFecha,
        notas_tecnico: notasTecnico,
        monto: montoNum,
        whatsapp_recordatorio_enviado: false,
      });

      // Actualizar auto con km actual, puntos y aceite recomendado
      const nuevosPuntos = (auto.puntos || 0) + puntosSumar;
      await updateAuto(auto.id, {
        kilometraje_actual: Number(kilometraje),
        puntos: nuevosPuntos,
        aceite_recomendado: aceiteUsado || auto.aceite_recomendado || '',
      });

      // Generar mensaje de WhatsApp
      let msg = '';
      if (serviciosPrevios.length === 0) {
        msg = mensajeBienvenida(auto.nombre_titular || 'Cliente', {
          marca: auto.marca,
          modelo: auto.modelo,
          patente: auto.patente,
        });
      } else {
        msg = buildWhatsAppMessage(
          auto.nombre_titular || 'Cliente',
          { marca: auto.marca, modelo: auto.modelo, patente: auto.patente },
          {
            tipo_servicio: tipoServicio,
            aceite_usado: aceiteUsado,
            kilometraje: Number(kilometraje),
            proximo_service_km: Number(proximoKm),
            proximo_service_fecha: proximaFecha,
          }
        );
      }

      setWhatsAppMsg(msg);
      setGuardadoExito(true);
      if (onGuardado) onGuardado();
    } catch (err) {
      console.error('Error al guardar servicio:', err);
      alert('Error al guardar el servicio en la base de datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnviarWhatsApp = () => {
    if (auto.telefono_titular) {
      abrirWhatsAppWeb(auto.telefono_titular, whatsAppMsg);
    } else {
      abrirWhatsAppWeb('5491127963982', whatsAppMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {guardadoExito ? (
          <div className="text-center py-8 space-y-6">
            <div className="p-4 rounded-full bg-green-600/20 text-green-400 w-fit mx-auto border border-green-500/30">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-3xl uppercase tracking-tight text-white">
                ¡Servicio Cargado con Éxito!
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Se guardó el registro para {auto.marca} {auto.modelo} ({auto.patente})
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs text-slate-300">
              <div className="font-bold text-slate-400 uppercase tracking-wider">Mensaje preparado para WhatsApp:</div>
              <pre className="font-sans whitespace-pre-wrap bg-slate-950 p-3 rounded-xl border border-white/5 text-slate-200">
                {whatsAppMsg}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleEnviarWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-green-600 hover:bg-green-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-green-600/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar comprobante por WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : paso === 1 ? (
          /* PASO 1: TIPO DE CAJA */
          <div className="space-y-6 text-center py-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Nuevo Servicio · {auto.patente}
              </span>
              <h2 className="font-display font-extrabold text-3xl uppercase tracking-tight text-white mt-1">
                Paso 1: Tipo de Caja
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Seleccioná el tipo de transmisión para habilitar los campos correspondientes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setTipoCaja('manual');
                  setPaso(2);
                }}
                className={`p-6 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  tipoCaja === 'manual'
                    ? 'bg-blue-600/20 border-blue-500 shadow-xl shadow-blue-500/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 w-fit mb-4">
                  <Settings className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                    Manual
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Caja estándar. Control de fluidos regular.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTipoCaja('automatica');
                  setPaso(2);
                }}
                className={`p-6 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  tipoCaja === 'automatica'
                    ? 'bg-purple-600/20 border-purple-500 shadow-xl shadow-purple-500/20'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 w-fit mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                    Automática
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    ATF / CVT / Secuencial. Habilita campo para aceite de caja.
                  </p>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* PASO 2: FORMULARIO COMPLETO */
          <form onSubmit={handleGuardar} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <button
                type="button"
                onClick={() => setPaso(1)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Cambiar caja ({tipoCaja})</span>
              </button>
              <span className="text-xs font-bold text-slate-300 uppercase">
                {auto.marca} {auto.modelo} ({auto.patente})
              </span>
            </div>

            {/* Datos básicos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Fecha
                </label>
                <input
                  type="date"
                  value={fechaServicio}
                  onChange={(e) => setFechaServicio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Kilometraje Actual
                </label>
                <input
                  type="number"
                  value={kilometraje}
                  onChange={(e) => handleKmChange(e.target.value)}
                  placeholder="Ej: 45000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Tipo de Servicio
                </label>
                <select
                  value={tipoServicio}
                  onChange={(e) => setTipoServicio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                >
                  <option value="cambio_aceite">Cambio de Aceite</option>
                  <option value="filtros">Cambio de Filtros</option>
                  <option value="refrigerante">Refrigerante</option>
                  <option value="frenos">Líquido de Frenos</option>
                  <option value="completo">Service Completo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            {/* Aceite y Filtros */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Aceite y Filtros Utilizados
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Marca y Tipo de Aceite
                  </label>
                  <input
                    type="text"
                    value={aceiteUsado}
                    onChange={(e) => setAceiteUsado(e.target.value)}
                    placeholder="Ej: Shell Helix Ultra 5W40"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Litros de Aceite
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={litrosAceite}
                    onChange={(e) => setLitrosAceite(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              {/* Toggles de Filtros */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FiltroToggle label="Filtro de Aceite" value={filtroAceite} onChange={setFiltroAceite} />
                <FiltroToggle label="Filtro de Aire" value={filtroAire} onChange={setFiltroAire} />
                <FiltroToggle label="Filtro de Combustible" value={filtroCombustible} onChange={setFiltroCombustible} />
                <FiltroToggle label="Filtro de Habitáculo" value={filtroHabitaculo} onChange={setFiltroHabitaculo} />
              </div>

              {/* Aceite de Caja Automática si corresponde */}
              {tipoCaja === 'automatica' && (
                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30">
                  <label className="block text-xs font-bold text-purple-300 mb-1">
                    Aceite de Caja Automática (ATF / CVT)
                  </label>
                  <input
                    type="text"
                    value={aceiteCaja}
                    onChange={(e) => setAceiteCaja(e.target.value)}
                    placeholder="Ej: Motul Multi ATF / Valvoline MaxLife"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-purple-500/40 text-white text-xs"
                  />
                </div>
              )}
            </div>

            {/* Otros productos agregados */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Otros Productos o Servicios Agregados
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nuevoProducto}
                  onChange={(e) => setNuevoProducto(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAgregarProducto(); } }}
                  placeholder="Escribir nombre o escanear código de barras..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={handleAgregarProducto}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar</span>
                </button>
              </div>

              {otrosProductos.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {otrosProductos.map((p, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-white"
                    >
                      <span>{p}</span>
                      <button
                        type="button"
                        onClick={() => handleEliminarProducto(idx)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Próximo service y Monto */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  Próximo Kilometraje
                </label>
                <input
                  type="number"
                  value={proximoKm}
                  onChange={(e) => setProximoKm(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  Próxima Fecha Estimada
                </label>
                <input
                  type="date"
                  value={proximaFecha}
                  onChange={(e) => setProximaFecha(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white mb-1">
                  Monto Total ($)
                </label>
                <input
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-bold"
                />
              </div>
            </div>

            {/* Notas técnicas */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Notas Técnicas / Observaciones
              </label>
              <textarea
                value={notasTecnico}
                onChange={(e) => setNotasTecnico(e.target.value)}
                placeholder="Presión de neumáticos, control de niveles, recomendaciones..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-green-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Servicio'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
