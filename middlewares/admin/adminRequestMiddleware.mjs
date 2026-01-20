// Importamos los modelos/schemas para validar los datos de las peticiones necesarios para este middleware.
import { validateSignInUser, validateSignOutUser } from '../../models/admin/authModelValidator.mjs';
// Importamos los valores de las rutas/endpoints necesarios para este middleware.
import { ADMIN_AUTH_ROUTE_PATH, ADMIN_WEB_ROUTE_PATH,
    AUTH_SIGNIN_ROUTE_PATH, AUTH_SIGNOUT_ROUTE_PATH
} from '../../config/GenericEnvConfig.mjs';
//// Exportamos el middleware.
export async function adminRequestMiddleware(req, res, next) {
    //
    if (req.method === 'GET' && Object.keys(req.query).length > 0) {
        // En caso de que la ruta sea /web/scraping/ (revisar /:url) evaluamos la query de la peticion en concreto.
        if(req.path === `${ADMIN_WEB_ROUTE_PATH}${WEB_SCRAPING_ROUTE_PATH}/`) {
            // Verificamos que el usuario que realiza la peticion es un admin.
            if (req.user.role !== 'admin') return res.status(403).json({ message: FORBIDDEN_403_MESSAGE });
            // Si hay una query en getScrapedDataByUrl de tipo setlang=(distinto de es) se trasforma.
            if (req.query.setlang && req.query.setlang !== 'es') {
                //req.query.setlang = 'en';¿¿?? RECOPILAER EL IDIOMA Y CONVERTIRLO AL RECIBIDO EN LA QUERY CON UN HOOK, PLUGIN O HELPER(REVISAR CON CUAL ENCAJA).
            }
        }
    }
    // Creamos la variable que contendra el resultado de la validacion de zod de los datos recibidos en la peticion.
    let zodValidationResult = "";
    // Validamos el cuerpo de la peticion.
    if (req.method === 'POST') {
        // En caso de que la ruta sea /auth/sign-in/ evaluamos el cuerpo de la peticion en concreto.
        if(req.path === `${ADMIN_AUTH_ROUTE_PATH}${AUTH_SIGNIN_ROUTE_PATH}/`) {
            // Validaciones del objeto a insertar. Si no hay body valido devolvemos un error.
            zodValidationResult = await validateSignInUser(req.body);
        }
        // En caso de que la ruta sea /auth/sign-out/ evaluamos el cuerpo de la peticion en concreto.
        if(req.path === `${ADMIN_AUTH_ROUTE_PATH}${AUTH_SIGNOUT_ROUTE_PATH}/`) {
            // Validaciones del objeto a insertar. Si no hay body valido devolvemos un error.
            zodValidationResult = await validateSignOutUser(req.body);
        }
    }
    if (zodValidationResult.error) return res.status(422).json({ message: zodValidationResult.error.message });
    // Verificamos que no haya queries en la peticion.
    if (req.method === 'DELETE' && Object.keys(req.query).length > 0)
        return res.status(400).json({ message: BAD_REQUEST_400_QUERY_MESSAGE });
    // Continuamos con el siguiente handler en la cola.
    next();
}