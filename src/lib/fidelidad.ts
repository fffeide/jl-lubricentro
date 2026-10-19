import { FidelidadConfig } from './types';

export const DEFAULT_FIDELIDAD_CONFIG: FidelidadConfig = {
  modo: 'fijo',
  monto_por_punto: 1000,
  puntos_fijos: 10
};

export function calcularPuntos(monto: number, config: FidelidadConfig = DEFAULT_FIDELIDAD_CONFIG): number {
  if (config.modo === 'monto') {
    const divisor = config.monto_por_punto > 0 ? config.monto_por_punto : 1000;
    return Math.floor((monto || 0) / divisor);
  }
  return config.puntos_fijos || 10;
}
