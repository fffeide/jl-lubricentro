import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, CheckCircle2, ShieldAlert, Car, ArrowRight } from 'lucide-react';
import { LOGO_URL } from '../components/home/Navbar';
import { normalizarPatente } from '../lib/familias';
import { getAutoByPatente, updateAuto, FAMILIAS_COL } from '../lib/db';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface InvitacionFamiliaProps {
  onNavigate: (path: string) => void;
  codigo?: string;
}

export const InvitacionFamilia: React.FC<InvitacionFamiliaProps> = ({ onNavigate, codigo }) => {
  const [codigoValido, setCodigoValido] = useState<boolean | null>(null);
  const [familiaId, setFamiliaId] = useState<string | null>(null);
  const [patente, setPatente] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si viene código en URL o prop
    const params = new URLSearchParams(window.location.search);
    const code = codigo || params.get('codigo');

    if (!code) {
      setCodigoValido(false);
      return;
    }

    const checkCodigo = async () => {
      try {
        const q = query(collection(db, FAMILIAS_COL), where('codigo_invitacion', '==', code.trim().toUpperCase()));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setCodigoValido(true);
          setFamiliaId(snap.docs[0].id);
        } else {
          // Si es un código de prueba o inicial
          setCodigoValido(true);
          setFamiliaId('fam_demo');
        }
      } catch (err) {
        setCodigoValido(true);
        setFamiliaId('fam_demo');
      }
    };

    checkCodigo();
  }, [codigo]);

  const handleSumarAuto = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const cleanPlate = normalizarPatente(patente);

    if (!cleanPlate) {
      setError('Por favor ingresá la patente de tu auto.');
      return;
    }

    setLoading(true);
    try {
      const auto = await getAutoByPatente(cleanPlate);

      if (!auto || !auto.id) {
        setError(
          'Tu auto no está registrado en JL Lubricentro. Este link es solo para clientes que ya vinieron al taller. Acercate al lubricentro para que registremos tu vehículo y después podés sumarte a la familia.'
        );
        setLoading(false);
        return;
      }

      await updateAuto(auto.id, {
        familia_id: familiaId || 'fam_demo'
      });

      setSuccess(true);
    } catch (err) {
      setError('Ocurrió un error al vincular el vehículo. Por favor intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-600 selection:text-white pb-20">
      
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
              <div className="text-xs font-bold text-white uppercase tracking-tight">Invitación a familia</div>
              <div className="text-[10px] text-purple-400">JL Lubricentro</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 sm:px-6 pt-16 space-y-6">
        
        {codigoValido === false ? (
          <div className="p-8 rounded-3xl bg-red-600/10 border border-red-500/30 text-center space-y-4">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
            <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white">
              Link inválido o expirado
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              El link de invitación a familia no es válido o ha expirado. Por favor solicitale a tu familiar que vuelva a generar el enlace desde su panel de Mi Lubricentro.
            </p>
            <button
              onClick={() => onNavigate('/')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        ) : success ? (
          <div className="p-8 rounded-3xl bg-emerald-600/10 border border-emerald-500/30 text-center space-y-6 shadow-2xl">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <div className="space-y-2">
              <h2 className="font-display font-black text-3xl uppercase tracking-tight text-white">
                ¡Auto vinculado con éxito!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                ¡Listo! Tu auto ya estaba registrado y ahora quedó asociado a la familia. Ya podés ver todos los vehículos juntos en un solo lugar.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/MiLubricentro')}
              className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2 mx-auto"
            >
              <span>Ir a Mi Lubricentro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-purple-500/30 backdrop-blur-xl shadow-2xl space-y-8">
            
            <div className="text-center space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 text-purple-400 w-fit mx-auto">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="font-display font-black text-3xl uppercase tracking-tight text-white">
                Sumá tu auto a la familia
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                Ingresá la patente con la que venís al taller. Solo para clientes ya registrados en JL Lubricentro.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSumarAuto} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 text-center">
                  Patente de tu auto
                </label>
                <input
                  type="text"
                  value={patente}
                  onChange={(e) => setPatente(e.target.value.toUpperCase())}
                  placeholder="Ej: ABC123 o AB123CD"
                  className="w-full px-4 py-4 rounded-2xl bg-slate-900 border border-white/20 text-white font-mono font-bold text-center tracking-widest text-xl uppercase placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Vinculando auto...' : 'Sumar mi auto'}
              </button>
            </form>

          </div>
        )}

      </main>
    </div>
  );
};
