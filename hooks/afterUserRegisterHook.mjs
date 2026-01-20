// Modulos locales como el servicio de email.
import { emailGeneratorFunction } from '../services/email/emailGeneratorFunction.mjs';
// Exportamos la función afterUserRegisterHook encargada de enviar el correo de confirmación al ususario cuando se registra.
export async function afterUserRegisterHook(emailAdressDestination) { return await emailGeneratorFunction(emailAdressDestination); }