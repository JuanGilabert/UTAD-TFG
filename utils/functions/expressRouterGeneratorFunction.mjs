// Importamos el router de express.
import { Router } from 'express';
//// Exportamos la factoria de routers para la creacion de los mismos.
export const expressRouterGenerator = (routerOptions = {}) => { return Router(routerOptions); };