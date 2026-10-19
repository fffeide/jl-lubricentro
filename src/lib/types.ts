export interface Auto {
  id?: string;
  marca: string;
  modelo: string;
  año?: number;
  patente: string;
  motor?: string;
  kilometraje_actual?: number;
  aceite_recomendado?: string;
  filtro_recomendado?: string;
  notas?: string;
  dni_titular?: string;
  nombre_titular?: string;
  email_titular?: string;
  telefono_titular?: string;
  familia_id?: string;
  grupo_id?: string;
  es_vehiculo_empresa?: boolean;
  familia_sugerida_auto_id?: string;
  familia_sugerida_titular?: string;
  datos_completados?: boolean;
  recibir_aviso_service?: boolean;
  fecha_aviso_service?: string;
  familia_prompt_mostrado?: boolean;
  puntos?: number;
  created_date?: string;
}

export interface Servicio {
  id?: string;
  auto_id: string;
  fecha_servicio: string;
  kilometraje: number;
  tipo_servicio: 'cambio_aceite' | 'filtros' | 'refrigerante' | 'frenos' | 'completo' | 'otro';
  tipo_caja?: 'manual' | 'automatica';
  aceite_usado?: string;
  litros_aceite?: number;
  filtro_aceite?: string;
  filtro_aire?: string;
  filtro_combustible?: string;
  filtro_habitaculo?: string;
  aceite_caja?: string;
  otros_productos?: string[];
  proximo_service_km?: number;
  proximo_service_fecha?: string;
  notas_tecnico?: string;
  monto?: number;
  whatsapp_recordatorio_enviado?: boolean;
  created_date?: string;
}

export interface Familia {
  id?: string;
  codigo_invitacion: string;
  created_date?: string;
}

export interface RolEmpresa {
  nombre: string;
  nivel: 'basico' | 'completo';
}

export interface Grupo {
  id?: string;
  nombre: string;
  tipo_empresa?: 'flota' | 'concesionaria' | 'alquiler' | 'transporte' | 'logistica' | 'otro';
  cuit?: string;
  contacto_nombre?: string;
  contacto_email?: string;
  telefono?: string;
  direccion?: string;
  activa?: boolean;
  roles?: RolEmpresa[];
  notas?: string;
  created_date?: string;
}

export interface MiembroGrupo {
  id?: string;
  grupo_id: string;
  grupo_nombre?: string;
  nombre: string;
  email?: string;
  telefono?: string;
  rol: string;
  nivel_acceso?: 'basico' | 'completo';
  activo?: boolean;
  created_date?: string;
}

export type CategoriaProducto = 
  | 'lubricantes' 
  | 'refrigerantes' 
  | 'filtros' 
  | 'liquido_frenos' 
  | 'aditivos_limpieza' 
  | 'herramientas' 
  | 'accesorios';

export interface Producto {
  id?: string;
  nombre: string;
  categoria: CategoriaProducto;
  marca?: string;
  descripcion?: string;
  imagen_url?: string;
  precio_referencia?: number;
  stock_disponible?: boolean;
  stock_cantidad?: number;
  codigo_barras?: string;
  created_date?: string;
}

export interface ItemVenta {
  producto_id?: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface Venta {
  id?: string;
  auto_id?: string;
  cliente_nombre?: string;
  patente?: string;
  items: ItemVenta[];
  monto_total: number;
  fecha: string;
  forma_pago: 'efectivo' | 'tarjeta' | 'transferencia';
  created_date?: string;
}

export interface FidelidadConfig {
  id?: string;
  modo: 'monto' | 'fijo';
  monto_por_punto: number;
  puntos_fijos: number;
}

export interface Recompensa {
  id?: string;
  nombre: string;
  descripcion?: string;
  puntos_necesarios: number;
  activa: boolean;
  created_date?: string;
}

export interface Canje {
  id?: string;
  auto_id?: string;
  patente?: string;
  cliente_nombre?: string;
  recompensa_id?: string;
  recompensa_nombre?: string;
  puntos_gastados: number;
  fecha?: string;
  realizado?: boolean;
  created_date?: string;
}
