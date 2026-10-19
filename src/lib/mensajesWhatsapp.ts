import { primerNombre } from './nombres';

export function getLinkMiLubricentro(patente: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://jlubricentro.base44.app';
  return `${origin}/MiLubricentro?patente=${encodeURIComponent(patente)}`;
}

export function mensajeBienvenida(nombreTitular: string, auto: { marca: string; modelo: string; patente: string }): string {
  const nombre = primerNombre(nombreTitular);
  const link = getLinkMiLubricentro(auto.patente);
  return `Hola ${nombre}!\nTe damos la bienvenida a *Mi Lubricentro* de *JL Lubricentro*.\n\nDesde acá podés ver el historial de servicios de tu *${auto.marca} ${auto.modelo} (${auto.patente})*, el próximo service recomendado y mucho más.\nTocá en el siguiente link para ver tu historial:\n${link}\n\n¡Gracias por confiar en nosotros!`;
}

export function buildWhatsAppMessage(
  nombreTitular: string,
  auto: { marca: string; modelo: string; patente: string },
  servicio: {
    tipo_servicio: string;
    aceite_usado?: string;
    kilometraje: number;
    proximo_service_km?: number;
    proximo_service_fecha?: string;
  }
): string {
  const nombre = nombreTitular ? `, ${primerNombre(nombreTitular)}` : '';
  const tipo = servicio.tipo_servicio.replace('_', ' ').toUpperCase();
  const aceite = servicio.aceite_usado || 'Recomendado';
  const proxKm = servicio.proximo_service_km ? `${servicio.proximo_service_km} km` : 'A definir';
  const proxFecha = servicio.proximo_service_fecha || 'A definir';

  return `Hola${nombre}!\n\nTu servicio de *${auto.marca} ${auto.modelo} (${auto.patente})* fue completado hoy.\n\nServicio: ${tipo}\nAceite: ${aceite}\nKilometraje: ${servicio.kilometraje} km\nPróximo service: ${proxKm}\nFecha estimada: ${proxFecha}\n\nGracias por confiar en *JL Lubricentro*!`;
}

export function mensajeRecordatorio(nombreTitular: string, vehiculo: string, fechaEstimada: string): string {
  const nombre = primerNombre(nombreTitular);
  return `Hola ${nombre}!\nTe recordamos que tu *${vehiculo}* puede estar próximo a necesitar service.\nFecha estimada: ${fechaEstimada}\nAv. Bartolomé Mitre 1592, Florida\n\nPasá por *JL Lubricentro* y lo hacemos sin turno.`;
}

export function abrirWhatsAppWeb(telefono: string, mensaje: string): void {
  let tel = (telefono || '').replace(/\D/g, '');
  if (tel && !tel.startsWith('54')) {
    tel = '54' + tel;
  }
  const url = tel 
    ? `https://wa.me/${tel}?text=${encodeURIComponent(mensaje)}`
    : `https://wa.me/5491127963982?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
