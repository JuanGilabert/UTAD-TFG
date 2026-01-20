// Importamos las funciones que vamos a probar
import { postSignInUser } from '../../models/admin/adminModel.mjs';
/** Test unitario para comprobar la funcion que loguea a un usuario.
 * 
 */
const signinUserData = {
    userEmail: "juangilabert2002@gmail.com",
    userPassword: "12345",
};
describe("Test unitario para comprobar la funcion que loguea a un usuario.", function() {
    // Caso Correcto.
    it('esta funcion debe realizar signin correctamente devolviendo un token.', async () => {
        // Obtenemos el resultadode la operacion de signin. En este caso sera el token de acceso del usuario logueado.
        const signinResponse = await postSignInUser(signinUserData);
        // Verificamos que el token obtenido no sea indefinido, es decir que existe.
        expect(signinResponse).toBeDefined();
        // Verificamos que el token obtenido sea de tipo string.
        expect(typeof signinResponse).toBe("string");
        // Verificamos que el token obtenido tiene el formato correcto.
        expect(signinResponse).toMatch(TOKEN_REGEX);
    });
    // Caso Incorrecto.
    it('esta funcion debe realizar signin incorrectamente, devolviendo un error.', async () => {
        // Obtenemos el resultadode la operacion de signin. En este caso sera el token de acceso del usuario logueado.
        const signinResponse = await postSignInUser(signinUserData);
        // Verificamos que la respuesta/mensaje obtenido sea cuando hay un error en los datos de signin.
        expect(signinResponse).toEqual({ message: "Invalid input." });
        // Verificamos que la respuesta/mensaje obtenido sea cuando hay un error al hacer signin cuando los datos del usuario son correctos.
        expect(signinResponse).toEqual({ message: "Login error." });
    });
});
/** Test de integracion para comprobar la funcion que loguea a un usuario.
 *
 */
const signinTokenPlayload = {
    userEmail: "juangilabert2002@gmail.com",
    userRole: "user"
}
describe("Test de integracion para comprobar la funcion que loguea a un usuario.", function() {
    // Caso Correcto.
    it('esta funcion debe realizar signin correctamente y devolver un token con un plyload correcto.', async () => {
        // Obtenemos el resultadode la operacion de signin. En este caso sera el token de acceso del usuario logueado.
        const signinResponse = await postSignInUser(signinUserData);
        // Verificamos que el token obtenido tiene el playload correcto.
    });
    // Caso Incorrecto.
    it('esta funcion debe realizar signin incorrectamente, devolviendo un error en el token o en el playload.', async () => {
        // Creamos el objeto que recibira el mensaje de error devuelto por la API.
        // Esto sera probado mediante un usuario que no existe en la base de datos.
        expect(postSignInUser(), loginApiResponse)
    });
});