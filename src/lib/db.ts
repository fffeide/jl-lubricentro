import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Auto, Servicio, Familia, Grupo, Producto, Venta, FidelidadConfig, Recompensa, Canje } from './types';
import { normalizarPatente } from './familias';

// Collection names
export const AUTOS_COL = 'autos';
export const SERVICIOS_COL = 'servicios';
export const FAMILIAS_COL = 'familias';
export const GRUPOS_COL = 'grupos';
export const PRODUCTOS_COL = 'productos';
export const VENTAS_COL = 'ventas';
export const RECOMPENSAS_COL = 'recompensas';
export const CANJES_COL = 'canjes';
export const CONFIG_COL = 'config';

// AUTOS
export async function getAutos(): Promise<Auto[]> {
  try {
    const snap = await getDocs(collection(db, AUTOS_COL));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Auto));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, AUTOS_COL);
  }
}

export async function getAutoByPatente(patente: string): Promise<Auto | null> {
  const norm = normalizarPatente(patente);
  try {
    const q = query(collection(db, AUTOS_COL), where('patente', '==', norm), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const docItem = snap.docs[0];
    return { id: docItem.id, ...docItem.data() } as Auto;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${AUTOS_COL}?patente=${norm}`);
  }
}

export async function getAutosByTitular(nombreOrDni: string): Promise<Auto[]> {
  try {
    const snap = await getDocs(collection(db, AUTOS_COL));
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as Auto));
    return list.filter(a => 
      (a.dni_titular && a.dni_titular.trim() === nombreOrDni.trim()) ||
      (a.nombre_titular && a.nombre_titular.toLowerCase().trim() === nombreOrDni.toLowerCase().trim())
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, AUTOS_COL);
  }
}

export async function addAuto(data: Omit<Auto, 'id'>): Promise<string> {
  try {
    const clean: Auto = {
      ...data,
      patente: normalizarPatente(data.patente),
      puntos: data.puntos || 0,
      created_date: new Date().toISOString()
    };
    const ref = await addDoc(collection(db, AUTOS_COL), clean);
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, AUTOS_COL);
  }
}

export async function updateAuto(id: string, data: Partial<Auto>): Promise<void> {
  try {
    const toUpdate: Partial<Auto> = { ...data };
    if (toUpdate.patente) {
      toUpdate.patente = normalizarPatente(toUpdate.patente);
    }
    await updateDoc(doc(db, AUTOS_COL, id), toUpdate);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${AUTOS_COL}/${id}`);
  }
}

export async function deleteAuto(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, AUTOS_COL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${AUTOS_COL}/${id}`);
  }
}

// SERVICIOS
export async function getServiciosByAuto(autoId: string): Promise<Servicio[]> {
  try {
    const q = query(collection(db, SERVICIOS_COL), where('auto_id', '==', autoId));
    const snap = await getDocs(q);
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() } as Servicio))
      .sort((a, b) => new Date(b.fecha_servicio).getTime() - new Date(a.fecha_servicio).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${SERVICIOS_COL}?auto_id=${autoId}`);
  }
}

export async function getAllServicios(): Promise<Servicio[]> {
  try {
    const snap = await getDocs(collection(db, SERVICIOS_COL));
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() } as Servicio))
      .sort((a, b) => new Date(b.fecha_servicio).getTime() - new Date(a.fecha_servicio).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, SERVICIOS_COL);
  }
}

export async function addServicio(data: Omit<Servicio, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(collection(db, SERVICIOS_COL), {
      ...data,
      created_date: new Date().toISOString()
    });
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, SERVICIOS_COL);
  }
}

export async function deleteServicio(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, SERVICIOS_COL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${SERVICIOS_COL}/${id}`);
  }
}

// PRODUCTOS
export async function getProductos(): Promise<Producto[]> {
  try {
    const snap = await getDocs(collection(db, PRODUCTOS_COL));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Producto));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, PRODUCTOS_COL);
  }
}

export async function addProducto(data: Omit<Producto, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(collection(db, PRODUCTOS_COL), {
      ...data,
      created_date: new Date().toISOString()
    });
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, PRODUCTOS_COL);
  }
}

export async function updateProducto(id: string, data: Partial<Producto>): Promise<void> {
  try {
    await updateDoc(doc(db, PRODUCTOS_COL, id), data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${PRODUCTOS_COL}/${id}`);
  }
}

export async function deleteProducto(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, PRODUCTOS_COL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${PRODUCTOS_COL}/${id}`);
  }
}

// FAMILIAS
export async function getFamilias(): Promise<Familia[]> {
  try {
    const snap = await getDocs(collection(db, FAMILIAS_COL));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Familia));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, FAMILIAS_COL);
  }
}

export async function getFamiliaByCodigo(codigo: string): Promise<Familia | null> {
  try {
    const q = query(collection(db, FAMILIAS_COL), where('codigo_invitacion', '==', codigo.trim().toUpperCase()), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as Familia;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, FAMILIAS_COL);
  }
}

export async function addFamilia(codigoInvitacion: string): Promise<string> {
  try {
    const ref = await addDoc(collection(db, FAMILIAS_COL), {
      codigo_invitacion: codigoInvitacion,
      created_date: new Date().toISOString()
    });
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, FAMILIAS_COL);
  }
}

// GRUPOS (EMPRESAS / FLOTAS)
export async function getGrupos(): Promise<Grupo[]> {
  try {
    const snap = await getDocs(collection(db, GRUPOS_COL));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Grupo));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, GRUPOS_COL);
  }
}

export async function getGrupoById(id: string): Promise<Grupo | null> {
  try {
    const snap = await getDoc(doc(db, GRUPOS_COL, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Grupo;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${GRUPOS_COL}/${id}`);
  }
}

export async function addGrupo(data: Omit<Grupo, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(collection(db, GRUPOS_COL), {
      ...data,
      activa: data.activa !== false,
      created_date: new Date().toISOString()
    });
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, GRUPOS_COL);
  }
}

export async function updateGrupo(id: string, data: Partial<Grupo>): Promise<void> {
  try {
    await updateDoc(doc(db, GRUPOS_COL, id), data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${GRUPOS_COL}/${id}`);
  }
}

export async function deleteGrupo(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, GRUPOS_COL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${GRUPOS_COL}/${id}`);
  }
}

// VENTAS (CAJA)
export async function getVentas(): Promise<Venta[]> {
  try {
    const snap = await getDocs(collection(db, VENTAS_COL));
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() } as Venta))
      .sort((a, b) => new Date(b.fecha || b.created_date || 0).getTime() - new Date(a.fecha || a.created_date || 0).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, VENTAS_COL);
  }
}

export async function addVenta(data: Omit<Venta, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(collection(db, VENTAS_COL), {
      ...data,
      created_date: new Date().toISOString()
    });

    // Descontar stock de productos vendidos si tienen producto_id
    if (data.items && data.items.length > 0) {
      for (const item of data.items) {
        if (item.producto_id) {
          try {
            const pDoc = await getDoc(doc(db, PRODUCTOS_COL, item.producto_id));
            if (pDoc.exists()) {
              const currentStock = pDoc.data().stock_cantidad || 0;
              const newStock = Math.max(0, currentStock - item.cantidad);
              await updateDoc(doc(db, PRODUCTOS_COL, item.producto_id), {
                stock_cantidad: newStock,
                stock_disponible: newStock > 0
              });
            }
          } catch (e) {
            console.error('Error actualizando stock de producto vendido:', e);
          }
        }
      }
    }

    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, VENTAS_COL);
  }
}

// RECOMPENSAS & FIDELIDAD
export async function getRecompensas(): Promise<Recompensa[]> {
  try {
    const snap = await getDocs(collection(db, RECOMPENSAS_COL));
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as Recompensa));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, RECOMPENSAS_COL);
  }
}

export async function addRecompensa(data: Omit<Recompensa, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(collection(db, RECOMPENSAS_COL), {
      ...data,
      activa: data.activa !== false,
      created_date: new Date().toISOString()
    });
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, RECOMPENSAS_COL);
  }
}

export async function updateRecompensa(id: string, data: Partial<Recompensa>): Promise<void> {
  try {
    await updateDoc(doc(db, RECOMPENSAS_COL, id), data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${RECOMPENSAS_COL}/${id}`);
  }
}

export async function deleteRecompensa(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, RECOMPENSAS_COL, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${RECOMPENSAS_COL}/${id}`);
  }
}

export async function getCanjes(): Promise<Canje[]> {
  try {
    const snap = await getDocs(collection(db, CANJES_COL));
    return snap.docs
      .map(d => ({ id: d.id, ...d.data() } as Canje))
      .sort((a, b) => new Date(b.created_date || 0).getTime() - new Date(a.created_date || 0).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, CANJES_COL);
  }
}

export async function addCanje(data: Omit<Canje, 'id'>): Promise<string> {
  try {
    const ref = await addDoc(collection(db, CANJES_COL), {
      ...data,
      created_date: new Date().toISOString()
    });
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, CANJES_COL);
  }
}

export async function getFidelidadConfig(): Promise<FidelidadConfig> {
  try {
    const snap = await getDoc(doc(db, CONFIG_COL, 'fidelidad'));
    if (!snap.exists()) {
      return { modo: 'fijo', monto_por_punto: 1000, puntos_fijos: 10 };
    }
    return snap.data() as FidelidadConfig;
  } catch (error) {
    return { modo: 'fijo', monto_por_punto: 1000, puntos_fijos: 10 };
  }
}

export async function updateFidelidadConfig(config: Partial<FidelidadConfig>): Promise<void> {
  try {
    await setDoc(doc(db, CONFIG_COL, 'fidelidad'), config, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${CONFIG_COL}/fidelidad`);
  }
}

// SEED INITIAL DATABASE IF EMPTY
export async function seedInitialDataIfEmpty(): Promise<void> {
  try {
    const snap = await getDocs(collection(db, PRODUCTOS_COL));
    if (snap.size > 0) return; // already seeded

    console.log('Seeding initial catalogue products and demo records...');

    const sampleProducts: Omit<Producto, 'id'>[] = [
      {
        nombre: 'Shell Helix Ultra 5W-40 4L',
        categoria: 'lubricantes',
        marca: 'Shell',
        descripcion: 'Lubricante sintético de última generación con tecnología PurePlus. Máxima protección y limpieza.',
        precio_referencia: 48500,
        stock_disponible: true,
        stock_cantidad: 24,
        codigo_barras: '779800123401',
        imagen_url: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80'
      },
      {
        nombre: 'Motul 8100 X-cess 5W-40 5L',
        categoria: 'lubricantes',
        marca: 'Motul',
        descripcion: '100% sintético de altas prestaciones. Aprobado por BMW, Mercedes-Benz, Porsche y VW.',
        precio_referencia: 62000,
        stock_disponible: true,
        stock_cantidad: 15,
        codigo_barras: '779800123402',
        imagen_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80'
      },
      {
        nombre: 'Liqui Moly Leichtlauf 10W-40 4L',
        categoria: 'lubricantes',
        marca: 'Liqui Moly',
        descripcion: 'Aceite de motor antifricción de alta tecnología con tecnología sintética alemana.',
        precio_referencia: 54000,
        stock_disponible: true,
        stock_cantidad: 18,
        codigo_barras: '779800123403',
        imagen_url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80'
      },
      {
        nombre: 'Total Glacelf Auto Supra Refrigerante 1L',
        categoria: 'refrigerantes',
        marca: 'Total',
        descripcion: 'Anticongelante orgánico de larga duración OAT. Protección contra la corrosión y sobrecalentamiento.',
        precio_referencia: 14500,
        stock_disponible: true,
        stock_cantidad: 30,
        codigo_barras: '779800123404',
        imagen_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80'
      },
      {
        nombre: 'Filtro de Aceite Mann W712/52',
        categoria: 'filtros',
        marca: 'Mann Filter',
        descripcion: 'Filtración de precisión alemana para motores Volkswagen, Audi y Seat.',
        precio_referencia: 12000,
        stock_disponible: true,
        stock_cantidad: 40,
        codigo_barras: '779800123405',
        imagen_url: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?auto=format&fit=crop&w=600&q=80'
      },
      {
        nombre: 'Líquido de Frenos Bosch DOT 4 500ml',
        categoria: 'liquido_frenos',
        marca: 'Bosch',
        descripcion: 'Alto punto de ebullición húmedo y seco para frenado seguro bajo exigencia extrema.',
        precio_referencia: 9800,
        stock_disponible: true,
        stock_cantidad: 22,
        codigo_barras: '779800123406',
        imagen_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
      },
      {
        nombre: 'Limpia Inyectores Gasolina Liqui Moly 300ml',
        categoria: 'aditivos_limpieza',
        marca: 'Liqui Moly',
        descripcion: 'Remueve depósitos en válvulas de inyección y cámara de combustión.',
        precio_referencia: 18500,
        stock_disponible: true,
        stock_cantidad: 25,
        codigo_barras: '779800123407',
        imagen_url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80'
      },
      {
        nombre: 'Escobillas Limpiaparabrisas Bosch Aerotwin 24"',
        categoria: 'accesorios',
        marca: 'Bosch',
        descripcion: 'Barrido silencioso y perfecto con alerón aerodinámico incorporado.',
        precio_referencia: 16500,
        stock_disponible: true,
        stock_cantidad: 12,
        codigo_barras: '779800123408',
        imagen_url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80'
      }
    ];

    for (const prod of sampleProducts) {
      await addDoc(collection(db, PRODUCTOS_COL), {
        ...prod,
        created_date: new Date().toISOString()
      });
    }

    // Config de fidelidad inicial
    await setDoc(doc(db, CONFIG_COL, 'fidelidad'), {
      modo: 'fijo',
      monto_por_punto: 1000,
      puntos_fijos: 10,
      updatedAt: new Date().toISOString()
    });

    // Sample car and service for immediate demonstration in Mi Lubricentro
    const carRef = await addDoc(collection(db, AUTOS_COL), {
      marca: 'Chevrolet',
      modelo: 'Onix',
      año: 2020,
      patente: 'AE123CD',
      motor: '1.4 LTZ',
      kilometraje_actual: 45000,
      aceite_recomendado: 'Shell Helix 10W40',
      filtro_recomendado: 'Mann W712/52',
      nombre_titular: 'Daniel Sosa',
      telefono_titular: '1127963982',
      dni_titular: '32456789',
      puntos: 40,
      datos_completados: true,
      recibir_aviso_service: true,
      fecha_aviso_service: '2026-10-15',
      created_date: new Date().toISOString()
    });

    await addDoc(collection(db, SERVICIOS_COL), {
      auto_id: carRef.id,
      fecha_servicio: '2025-12-15',
      kilometraje: 45000,
      tipo_servicio: 'cambio_aceite',
      tipo_caja: 'manual',
      aceite_usado: 'Shell Helix 10W40',
      litros_aceite: 4,
      filtro_aceite: 'Sí',
      filtro_aire: 'Sí',
      filtro_combustible: 'No',
      filtro_habitaculo: 'Sí',
      proximo_service_km: 55000,
      proximo_service_fecha: '2026-10-15',
      monto: 65000,
      notas_tecnico: 'Control general de niveles OK. Presión de neumáticos regulada a 32 PSI.',
      whatsapp_recordatorio_enviado: false,
      created_date: new Date().toISOString()
    });

  } catch (e) {
    console.error('Error during initial seed:', e);
  }
}
