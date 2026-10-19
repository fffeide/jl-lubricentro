// Etiquetas reutilizables para funciones en prueba (BETA) / recien lanzadas (NUEVO).
// Pensadas para verse sobre fondos oscuros (los paneles de Mi Lubricentro y Admin).

export function BetaBadge({ className = '' }) {
  return (
    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wide bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full px-2 py-0.5 ${className}`}>
      BETA
    </span>
  );
}

export function NuevoBadge({ className = '' }) {
  return (
    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wide bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full px-2 py-0.5 ${className}`}>
      Nuevo
    </span>
  );
}
