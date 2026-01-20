// Modulos de node.
import path from 'path';
import nodemailer from 'nodemailer';
// Importamos las credenciales de acceso para el servicio de correo.
import {
    EMAIL_SERVICE_USER, EMAIL_SERVICE_PASSWORD,
    EMAIL_SERVICE_HOST, EMAIL_SERVICE_SIGNUP_SUBJECT
} from '../../config/EnvConfig.mjs';
// Configuramos el transportador con el servicio y credenciales.
const gmailTransporter = nodemailer.createTransport({
    // Si usas Gmail, necesitas una contraseña de aplicación, no tu clave normal. Puedes generarla en tu cuenta de Google.
    service: 'gmail',
    auth: { user: EMAIL_SERVICE_USER, pass: EMAIL_SERVICE_PASSWORD }
});
const hotmailTransporter = nodemailer.createTransport({
    // Si usas hotmail, necesitas ¿¿??
    service: 'hotmail',
    auth: { user: EMAIL_SERVICE_USER, pass: EMAIL_SERVICE_PASSWORD }
});
// Expostamos la funcion encargada de enviar el correo.
export async function emailGeneratorFunction(emailAdressDestination) {
    // Plantilla html del correo a enviar.
    const htmlEmail = path.join('../../frontend/ui/html/', 'emailService.html');
    // Verificamos el tipo de email que tiene el usuario.para saber el transportador a utilizar(gmail, hotmail, etc).
    const emailType = emailAdressDestination.split("@")[1];
    // Obtenemos el tipo de trasnportador a utilizar.
    const emailTransporterType = emailType === 'gmail.com' ? gmailTransporter : hotmailTransporter;
    // Enviamos el correo con el transportador configurado.
    try {
        const emailTransporterResponse = await emailTransporterType.sendMail({
            from: EMAIL_SERVICE_HOST, to: emailAdressDestination,
            subject: EMAIL_SERVICE_SIGNUP_SUBJECT, html: htmlEmail
        });
        console.log('Correo enviado: %s', emailTransporterResponse.messageId);
        return { success: true, message: "Correo enviado exitosamente." };
    } catch (error) {
        console.error('Error enviando correo:', error);
        return { success: false, message: `No se pudo enviar el correo: ${error}` };
    }
}