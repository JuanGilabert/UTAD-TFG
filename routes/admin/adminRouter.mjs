// Importamos el generador de routers.
import { expressRouterGenerator } from '../../utils/functions/expressRouterGeneratorFunction.mjs';
// Importamos los middlewares necesarios para este router.
import { requestMiddleware } from "../../middlewares/requestMiddleware.mjs";
import { headerAuthMiddleware } from '../../middlewares/headerAuthMiddleware.mjs';
import { adminRequestMiddleware } from "../../middlewares/admin/adminRequestMiddleware.mjs";
// Importamos los controladores necesarios para este router.
import { AdminController } from '../../controllers/admin/adminController.mjs';
// Importamos los valores de las rutas/endpoints necesarios para este router.
import { ADMIN_AUTH_ROUTE_PATH, ADMIN_DOCUMENTATION_ROUTE_PATH, AUTH_SIGNIN_ROUTE_PATH, AUTH_SIGNOUT_ROUTE_PATH,
    ADMIN_WEB_ROUTE_PATH, WEB_SCRAPING_ROUTE_PATH
} from '../../config/GenericEnvConfig.mjs';
/** adminRouter.
 * Esta funcion devuelve un router de express que tiene las siguiente rutas:
 * - POST /signin: Inicia la sesion de un usuario y devuelve un token.
 * - POST /signout: Cierra la sesion del usuario actual.
 * 
 * @param {Object} options - Objeto con la configuracion del router.
 * @param {Model} options.AdminModel - Modelo de la base de datos para los usuarios.
 * @returns {Router} Un router de express con las rutas de autenticacion.
 */
export const adminRouter = ({ AdminModel }) => {
    const adminRouter = expressRouterGenerator();
    const adminController = new AdminController({ model: AdminModel });
    //// DOCUMENTATION
    // GET Obtencion de la documentacion de la API --> /api/admin/documentation Devolverá la página de swagger con la documentación de la api.
    adminRouter.get(`${ADMIN_DOCUMENTATION_ROUTE_PATH}`, adminController.getApiDocumentation);
    //// AUTH
    // Inicio de sesión. --> /api/admin/auth/sign-in
    adminRouter.post(
        `${ADMIN_AUTH_ROUTE_PATH}${AUTH_SIGNIN_ROUTE_PATH}`,
        requestMiddleware, adminRequestMiddleware, adminController.postSignInUser
    );
    // Cierre de sesion. --> /api/admin/auth/signout
    adminRouter.post(
        `${ADMIN_AUTH_ROUTE_PATH}${AUTH_SIGNOUT_ROUTE_PATH}`,
        headerAuthMiddleware, requestMiddleware, adminRequestMiddleware, adminController.postSignOutUser
    );
    /* AÑADIR ENDPOINTS PARA EDITAR O ELIMINAR COSAS DE LOS USUARIOS EN MASA,
    RECIBIENDO POR EJEMPLO UNA LISTA CON(elegir si se reciben ids o el que ... como nombres de cosas ...) */
    /* ESTABLECER REDIRECCIONES EN BASE A LAS ORDENES, ES DECIR, SI POR EJEMPLO UN ADMIN QUIERE EDITAR A UN USUARIO
    LO HARA CON UNA REDIRECCION AL ENDPOINT APROPIADO PARA ELLO */
    //// WEB SCRAPING
    // Endpoint para realizar web scraping --> /api/admin/web/scraping/:url
    adminRouter.get(`${ADMIN_WEB_ROUTE_PATH}${WEB_SCRAPING_ROUTE_PATH}/:url`,
        headerAuthMiddleware, requestMiddleware, adminRequestMiddleware, adminController.getScrapedDataByUrl
    );
    //// Devolvemos la configuracion del router.
    return adminRouter;
}