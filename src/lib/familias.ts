export function normalizarPatente(p: string): string {
  return (p || '').trim().toUpperCase().replace(/\s/g, '');
}

export function generarCodigoInvitacion(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
