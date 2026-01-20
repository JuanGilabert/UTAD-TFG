import cron from 'node-cron';
const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');

// Lista de destinatarios (incluye código de país y área, sin +)
const destinatarios = [
    '521234567890', // México
    '541112345678', // Argentina
    '34615978157', // España
];
// Mensaje a enviar
const mensaje = 'Hola! Este es un mensaje automático enviado cada 30 minutos desde mi servidor AWS.';
// Autenticación persistente
const { state, saveState } = useSingleFileAuthState('./auth_info.json');
////
async function iniciarBotWhatsApp() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, // Muestra QR en consola
    });
    // Guarda sesión cuando cambie
    sock.ev.on('creds.update', saveState);
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log('Conexión cerrada. Reconectando...', reason);
            iniciarBotWhatsApp();
        } else if (connection === 'open') {
            console.log('✅ Conectado exitosamente a WhatsApp');
        }
    });
    // Envía mensajes cada 30 minutos en el minuto 0 y 30 de cada hora
    cron.schedule('0,30 * * * *', async () => {
        console.log('⏰ Enviando mensajes ...');
        for (let numero of destinatarios) {
            try {
                await sock.sendMessage(`${numero}@s.whatsapp.net`, { text: mensaje });
                console.log(`✅ Mensaje enviado a ${numero}`);
            } catch (err) {
                console.error(`❌ Error al enviar a ${numero}:`, err.message);
            }
        }
    });
    /* Envía mensajes a todos los números de la lista cada 30 minutos. POSIBLE OBSOLETO.
    setInterval(async () => {
        console.log('⏰ Enviando mensajes ...');
        for (let numero of destinatarios) {
            try {
                await sock.sendMessage(`${numero}@s.whatsapp.net`, { text: mensaje });
                console.log(`✅ Mensaje enviado a ${numero}`);
            } catch (err) {
            console .error(`❌ Error al enviar a ${numero}:`, err.message);
            }
        }
    }, 30 * 60 * 1000); // 30 minutos*/
}
//
iniciarBotWhatsApp();

