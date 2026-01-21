// Modulos de node.
//import { chromium } from 'playwright';
import { hash, genSalt, compare } from 'bcrypt';
// Modulos locales.
import { jwtGenerator } from '../../services/jwt/jwtGeneratorFunction.mjs';
import { connectDB, closeDbConnection } from '../../services/database/connection/mongoDbConnection.mjs';
import { checkIfUserExistsFunction } from '../../services/database/functions/mongoDbFunctions.mjs';
import { USER_COLLECTION_NAME, HASH_SALT_ROUNDS, RETURN_DOCUMENT_VALUE } from '../../config/EnvConfig.mjs';
//// Exportamos la clase.
export class AdminModel {
    // Funcion asincrona para loguear a un usuario
    static async postSignInUser({ userEmail, userPassword }) {
        const db = await connectDB();
        let token = "";
        let hashedToken = "";
        const user = await checkIfUserExistsFunction(userEmail, { returnUser: true });
        if (!user) return { message: "Invalid input." };
        try {
            const isPasswordValid = await compare(userPassword, user.userPassword);
            if (!isPasswordValid) return { message: "Invalid input." };
            // Generar JWT para el usuario.
            token = jwtGenerator({ userEmail: user.userEmail, userRole: user.userRole });
            // Hasheamos el token generado. VERIFICAR SI ESTO PUEDE GENERAR PROBLEMAS PARA LA EXTRACCION DE LA INFORMACION DEL USUARIO.
            //const saltRounds = await genSalt(HASH_SALT_ROUNDS);
            //hashedToken = await hash(token, saltRounds);
        } catch (error) {
            console.error("Error al loguear el usuario:", error);
            return { message: "Login error." };
        }
        // Guardamos el JWT en la base de datos asociado al usuario en la propiedad userJWT.
        const value = await db.collection(USER_COLLECTION_NAME).findOneAndUpdate(
            { _id: user._id }, { $set: { userJWT: token } }, { returnDocument: RETURN_DOCUMENT_VALUE }
        );
        // Devolvemos el error obtenido al intentar loguear al usuario.
        if (!value) return false;
        // Enviamos el JWT en la respuesta para que el cliente lo reciba y pueda usar la aplicacion.
        return value.userJWT;
    }
    // Funcion asincrona para cerrar la sesion de un usuario. SE SUPONE QUE SOLO SE RECIBE UN TOKEN PARA ACTUALIZAR AL USUARIO LOGUEADO.
    static async postSignOutUser({ userJWT }) {
        const db = await connectDB();
        // Hasheamos el token generado. VERIFICAR SI ESTO PUEDE GENERAR PROBLEMAS PARA LA EXTRACCION DE LA INFORMACION DEL USUARIO.
        //const saltRounds = await genSalt(HASH_SALT_ROUNDS);
        //let hashedUserJWT = await hash(token, saltRounds);
        const value = await db.collection(USER_COLLECTION_NAME).findOneAndUpdate({ userJWT: userJWT }, { $set: { userJWT: "" } });
        // Devolvemos el error obtenido al intentar cerrar la sesion.
        if (!value) return false;
        // Cerramos la conexion con la base de datos.
        await closeDbConnection();
        // Devolvemos la respuesta obtenida.
        return value;
    }
    // Endpoint de web scraping que recibe la url a scrapear.
    static async getScrapedDataByUrl(urlToScrape) {
        // Abrimos navegador pero con la configuracion de que no lo haga con la ventana.
        const browser = await chromium.launch({ headless: true });
        // Creamos una nueva pagina en el navegador .
        const page = await browser.newPage();
        // Vamos a la pagina que queremos extraer.
        await page.goto(urlToScrape);
        // Usar herramientas de desarrollo para saber fijarnos que elementos tienen la informacion que queremos useSyncExternalStore.
        const data = await page.evaluate(
            '.s-card-container', (results) => (
                results.map((result) => {
                    return {
                        title: result.querySelector('.s-card-title').textContent,
                        description: result.querySelector('.s-card-description').textContent,
                        price: result.querySelector('.s-card-price').textContent
                    }
                })
            )
        )
        // Cerramos el navegador.
        await browser.close();
        /* CONVERTIR LOS DATOS SCRAPEADOS EN UN JSON Y TAMBIEN GUARDAR EN UN WORD QUE SE ENVIA POR CORREO.
        ESTABLECER A LARGO PLAZO UNA SUBIDA A UN NAS AL COMPLETO. LA IDEA ES SELECCIONAR UNA CARPETA DEL MOVIL(Screenshots) Y SUBIR MULTIPLES FICHEROS/ARCHIVOS. */
        return data;
    }
}
/* MIDUDEV - linkedin
async () => {
    // Abrimos navegador pero con la configuracion de que no lo haga con la ventana.
    const browser = await chromium.launch(
        { headless: true }
    );
    // Creamos una nueva pagina en el navegador .
    const page = await browser.newPage();
    // Vamos a la pagina que queremos extraer.
    await page.goto('https://playwright.dev/');
    // Usar herramientas de desarrollo para saber fijarnos que elementos tienen la informacion
    // que queremos useSyncExternalStore.
    const data = await page.evaluate(
        '.s-card-container', (results) => (
            results.map((result) => {
                return {
                    title: result.querySelector('.s-card-title').textContent,
                    description: result.querySelector('.s-card-description').textContent,
                    price: result.querySelector('.s-card-price').textContent
                }
            })
        )
    )
    // Cerramos el navegador.
    await browser.close();
}
*/