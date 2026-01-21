// Importamos los modelos para su inyeccion.
import { AdminModel } from '../../models/admin/adminModel.mjs';
// Importamos las configuraciones necesarias.
import { TOKEN_REGEX } from '../../config/EnvConfig.mjs';
/** Test unitario para comprobar la funcion que loguea a un usuario.
 * 
 */
const signinUserData = { userEmail: "juangilabert2002@gmail.com", userPassword: "12345"};
describe("unit test", function() {
    // Esta funcion debe realizar signin correctamente devolviendo un token.
    it('signinUser success', async () => {
        // Obtenemos el resultadode la operacion de signin. En este caso sera el token de acceso del usuario logueado.
        const signinResponse = await AdminModel.postSignInUser(signinUserData);
        // Verificamos que el token obtenido no sea indefinido, es decir que existe.
        expect(signinResponse).toBeDefined();
        // Verificamos que el token obtenido sea de tipo string.
        expect(typeof signinResponse).toBe("object");
        // Verificamos que el token obtenido tiene el formato correcto.
        expect(signinResponse.userJWT).toMatch(TOKEN_REGEX);
    });
    // Esta funcion debe realizar signin incorrectamente y devolver un error de tipo Invalid input.
    it('signinUser errorInvalidInput', async () => {
        // Obtenemos el resultadode la operacion de signin. En este caso sera el token de acceso del usuario logueado.
        const signinResponse = await AdminModel.postSignInUser(signinUserData);
        // Verificamos que la respuesta/mensaje obtenido sea cuando hay un error en los datos de signin.
        expect(signinResponse).toEqual({ message: "Invalid input." });
    });
    // esta funcion debe realizar signin incorrectamente, devolviendo un error de tipo Login error.
    it('signinUser errorLoginError', async () => {
        // Obtenemos el resultadode la operacion de signin. En este caso sera el token de acceso del usuario logueado.
        const signinResponse = await postSignInUser(signinUserData);
        // Verificamos que la respuesta/mensaje obtenido sea cuando hay un error al hacer signin cuando los datos del usuario son correctos.
        expect(signinResponse).toEqual({ message: "Login error." });
    });
});