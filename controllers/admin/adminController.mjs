// Importamos los mensajes de respuesta para responder con los mismos a las peticiones correspondientes.
import {
    OKEY_200_MESSAGE, CREATED_201_MESSAGE,
    UNAUTHORIZED_401_MESSAGE, INTERNAL_SERVER_ERROR_500_MESSAGE
} from '../../config/EnvConfig.mjs';
//// Exportamos la clase AdminController.
export class AdminController {
    constructor({ model }) {
        this.model = model;
        this.postSignInUser = this.postSignInUser.bind(this);
        this.postSignOutUser = this.postSignOutUser.bind(this);
    }
    // Funcion para loguear un usuario.
    postSignInUser = async (req, res) => {
        console.log(req.body);
        // Obtenemos del modelo los datos requeridos.
        const signinModelResponse = await this.model.postSignInUser(req.body);
        // Si el email o la contraseña son incorrectos devolvemos el error correspondiente.
        if (signinModelResponse?.message === "Invalid input.")
            return res.status(401).json({ message: `${UNAUTHORIZED_401_MESSAGE} El email o la contraseña son incorrectos.` });
        // Si ocurre un error interno al comparar las contraseñas o al generar el token devolvemos el error correspondiente.
        if (signinModelResponse?.message === "Login error.")
            return res.status(500).json({ message: `${INTERNAL_SERVER_ERROR_500_MESSAGE}. ${signinModelResponse.message}.` });
        // Si el usuario no ha podido actaulizarse en la ddbb entonces devolvemos el error.
        if (signinModelResponse === false) return res.status(500).json({ message: INTERNAL_SERVER_ERROR_500_MESSAGE });
        console.log(signinModelResponse)
        /* Enviamos la respuesta obtenida, es decir el token.
        La cookie no puede ser accedida desde el lado del cliente,
        solo funciona con https y solo es accesible en el mismo dominio. */
        return res.status(200).json({ token: signinModelResponse });
    }
    // Funcion para desloguear un usuario
    postSignOutUser = async (req, res) => {
        // Obtenemos del modelo los datos recibidos.
        const signoutModelResponse = await this.model.postSignOutUser(req.body);
        // Si ocurre un error interno al comparar las contraseñas o al generar el token devolvemos el error correspondiente.
        if (signoutModelResponse === false) return res.status(500).json({ message: `${INTERNAL_SERVER_ERROR_500_MESSAGE}. No se pudo cerrar la sesion.` });
        // Enviamos la respuesta obtenida.
        return res.status(200).json({ message: "La sesion se ha cerrado correctamente." });
    }
    // Funcion para realizar web scraping de una url.
    getScrapedDataByUrl = async (req, res) => {
        // Obtenemos de la peticion los valores necesarios.
        const { url } = req.params;
        // Obtenemos del modelo los datos recibidos.
        const getScrapedDataByUrlModelResponse = await this.model.getScrapedDataByUrl(url);
        // Enviamos la respuesta obtenida.
        return res.status(200).json({ data: getScrapedDataByUrlModelResponse });
    }
}