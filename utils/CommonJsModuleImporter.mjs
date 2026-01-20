/* Importer utilizado para realizar la importacion de modulos en CommonJS.
Esto es ampliamente utilizado en ESmodules al no poderse utilizar en ellos require(nombre_del_modulo_a_importar) */
// Importamos la funcion  createRequire  para crear un require personalizado.
import { createRequire } from 'node:module';
// import.meta.url  :  define/contiene la ruta actual del proyecto (taskManagerServer/).
const require = createRequire(import.meta.url);
// Cuando esta funcion sea ejecutada devolvera el require de la ruta recibida por parametro.
export const commonJSModule = (path) => require(path)