/**
 * Cloud Function para JL Lubricentro: Recordatorios automáticos por WhatsApp
 * 
 * Revisa una vez al día todos los Servicios cuya proximo_service_fecha esté
 * a 3-5 días de la fecha actual. Envía un mensaje vía WhatsApp Cloud API de Meta
 * y marca el servicio con whatsapp_recordatorio_enviado: true para evitar duplicados.
 * 
 * Variables de entorno requeridas:
 * - WHATSAPP_PHONE_NUMBER_ID: ID del número de teléfono en Meta Cloud API
 * - WHATSAPP_ACCESS_TOKEN: Token permanente o de sistema de Meta
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

exports.enviarRecordatoriosWhatsappDiarios = functions.pubsub
  .schedule('0 9 * * *') // Todos los días a las 9:00 AM
  .timeZone('America/Argentina/Buenos_Aires')
  .onRun(async (context) => {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
      console.warn('Faltan configurar las variables de entorno WHATSAPP_PHONE_NUMBER_ID o WHATSAPP_ACCESS_TOKEN.');
      return null;
    }

    const hoy = new Date();
    // Fechas límites: entre 3 y 5 días hacia adelante
    const fechaMin = new Date(hoy);
    fechaMin.setDate(fechaMin.getDate() + 3);
    const fechaMax = new Date(hoy);
    fechaMax.setDate(fechaMax.getDate() + 5);

    const minStr = fechaMin.toISOString().split('T')[0];
    const maxStr = fechaMax.toISOString().split('T')[0];

    console.log(`Buscando servicios con próximo service entre ${minStr} y ${maxStr}...`);

    try {
      // Consultamos servicios próximos donde no se haya enviado aún el recordatorio
      const serviciosSnapshot = await db.collection('servicios')
        .where('whatsapp_recordatorio_enviado', '==', false)
        .where('proximo_service_fecha', '>=', minStr)
        .where('proximo_service_fecha', '<=', maxStr)
        .get();

      if (serviciosSnapshot.empty) {
        console.log('No se encontraron servicios pendientes de recordatorio para hoy.');
        return null;
      }

      console.log(`Se encontraron ${serviciosSnapshot.size} servicios para notificar.`);

      for (const doc of serviciosSnapshot.docs) {
        const servicio = doc.data();
        const autoId = servicio.auto_id;

        if (!autoId) continue;

        const autoDoc = await db.collection('autos').doc(autoId).get();
        if (!autoDoc.exists) continue;

        const auto = autoDoc.data();
        let telefono = (auto.telefono_titular || '').replace(/\D/g, '');

        if (!telefono || telefono.length < 8) {
          console.log(`El vehículo ${auto.patente} no posee un teléfono válido registrado.`);
          continue;
        }

        // Si es número de Argentina y no incluye código país (54), lo normalizamos
        if (!telefono.startsWith('54')) {
          telefono = '54' + telefono;
        }

        const primerNombre = (auto.nombre_titular || 'Cliente').trim().split(' ')[0];
        const mensajeTexto = `Hola ${primerNombre}! Te recordamos que tu ${auto.marca} ${auto.modelo} (${auto.patente}) tiene fecha estimada de próximo service para el ${servicio.proximo_service_fecha}.\n\nTe esperamos en JL Lubricentro (Av. Bartolomé Mitre 1592, Florida) para realizar el mantenimiento sin turno previo.`;

        // Llamada a Meta WhatsApp Cloud API
        const payload = {
          messaging_product: 'whatsapp',
          to: telefono,
          type: 'text',
          text: {
            preview_url: false,
            body: mensajeTexto
          }
        };

        const res = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          console.log(`Recordatorio enviado a ${telefono} para la patente ${auto.patente}`);
          await doc.ref.update({
            whatsapp_recordatorio_enviado: true,
            whatsapp_enviado_fecha: new Date().toISOString()
          });
        } else {
          const errData = await res.text();
          console.error(`Error al enviar mensaje WhatsApp a ${telefono}:`, errData);
        }
      }

      return null;
    } catch (error) {
      console.error('Error durante la ejecución del cron de WhatsApp:', error);
      throw error;
    }
  });
