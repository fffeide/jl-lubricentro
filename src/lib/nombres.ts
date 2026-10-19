export function normalizarNombre(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function primerNombre(str: string): string {
  if (!str) return 'Cliente';
  const clean = normalizarNombre(str);
  return clean.split(' ')[0] || 'Cliente';
}
