// Importamos los mensajes de respuesta para responder con los mismos a las peticiones correspondientes.
import {
    OKEY_200_MESSAGE, CREATED_201_MESSAGE,
    FORBIDDEN_403_MESSAGE, CONFLICT_409_MESSAGE,
    INTERNAL_SERVER_ERROR_500_MESSAGE
} from '../../config/EnvConfig.mjs';
//// Exportamos la clase UserController
export class UserController { // HAY QUE REVISAR TODOS LOS ERRORES QUE SE DEVUELVEN AQUI. SEE: MODELO. REALIZAR ANTES DE NADA EL JSDoc de un modelo ya valido al 100%.
    constructor({ model }) {
        this.model = model;
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.postUser = this.postUser.bind(this);
        this.putUser = this.putUser.bind(this);
        this.patchUser = this.patchUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    // Funcion asincrona para obtener todos los usuarios.
    getAllUsers = async (req, res) => {
        const { userRole } = req.user;
        // Si el rol del usuario es diferente de admin, devolvemos un error.
        if (userRole !== 'admin') return res.status(403).json({ message: FORBIDDEN_403_MESSAGE });
        // Obtenemos del modelo los datos requeridos.
        const apiGetAllUsersResponse = await this.model.getAllUsers();
        // Enviamos el error con el mensaje correspondiente. REVISAR QUE ES ESTO, PORQUE SE DEVUELVE FALSE Y DEMAS.posible 200 sin usuarios que mostrar
        if (apiGetAllUsersResponse === false) return res.status(500).json({ message: INTERNAL_SERVER_ERROR_500_MESSAGE });
        return res.status(200).json(apiGetAllUsersResponse);
    }
    // Funcion asincrona para obtener el perfil de un usuario para su posterior edicion.
    getUserById = async (req, res) => {
        let getUserByIdModelResponse = "";
        // Obtenemos los valores de la peticion.
        const { id } = req.params;
        // Obtenemos del modelo los datos requeridos.
        try {
            // Si eres un admin puedes ver el perfil de cualquier usuario.
            const { userRole } = req.user;
            if (userRole === 'admin') getUserByIdModelResponse = await this.model.getUserById(id);
            // Solo el usuario logueado es quien puede ver su propio perfil a parte de los administradores.
            const { userId } = req.user;
            if (id === userId) getUserByIdModelResponse = await this.model.getUserById(id);
            else return res.status(403).json({ message: `${FORBIDDEN_403_MESSAGE} No tienes permiso para ver este perfil.` });
            // Enviamos el error con el mensaje correspondiente.
            // REVISAR QUE ES ESTO, PORQUE SE DEVUELVE FALSE Y DEMAS. no existe el usuario que se quiere ver posible 410
            if (getUserByIdModelResponse === false) return res.status(500).json({ message: INTERNAL_SERVER_ERROR_500_MESSAGE });
            // Enviamos la respuesta obtenida.
            return res.status(200).json(getUserByIdModelResponse);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: INTERNAL_SERVER_ERROR_500_MESSAGE });
        }
    }
    // Funcion asincrona para registrar/crear un nuevo usuario.
    postUser = async (req, res) => {
        // Obtenemos del modelo los datos requeridos.
        try {
            const registerUserModelResponse = await this.model.postUser(req.body);
            // Si el email existe devolvemos un error(conflict).
            if (registerUserModelResponse?.type === "Email")
                return res.status(409).json({ message: `${CONFLICT_409_MESSAGE} ${registerUserModelResponse?.message}` });
            // Enviamos el error obtenido ya que la operación de inserción no fue reconocida por MongoDB.
            if (registerUserModelResponse?.type === "Error")
                return res.status(500).json({ message: `${INTERNAL_SERVER_ERROR_500_MESSAGE} ${registerUserModelResponse?.message}` });
            // Enviamos la respuesta obtenida.
            return res.status(201).json({ message: CREATED_201_MESSAGE });
        } catch (error) {
            return res.status(500).json({ message: `${INTERNAL_SERVER_ERROR_500_MESSAGE} No se pudo crear el usuario: ${error}` });
        }
    }
    // Funcion asincrona para actualizar un usuario.
    putUser = async (req, res) => {
        let putUserByIdModelResponse = "";
        //Obtenemos los valores de la peticion.
        const { id } = req.params;
        const { userRole } = req.user;
        // Si eres un admin puedes actualizar el perfil de cualquier usuario.
        try {
            if (userRole === 'admin') putUserByIdModelResponse = await this.model.putUser({ id, user: result.data, userRole });
            // Solo el usuario logueado es quien puede actualizar su propio perfil a parte de los administradores.
            const { userId } = req.user;
            if (id === userId) putUserByIdModelResponse = await this.model.putUser({ id, user: result.data });
            else return res.status(403).json({ message: `${FORBIDDEN_403_MESSAGE} No tienes permiso para actualizar este perfil.` });
            // Enviamos el error con el mensaje correspondiente.
            if (putUserByIdModelResponse === false) return res.status(500).json({ message: INTERNAL_SERVER_ERROR_500_MESSAGE });
            // Enviamos la respuesta obtenida.
            return res.status(200).send({ message: OKEY_200_MESSAGE });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: `${INTERNAL_SERVER_ERROR_500_MESSAGE} ${error}` });
        }
    }
    // Funcion asincrona para actualizar un usuario.
    patchUser = async (req, res) => {
        let patchUserByIdModelResponse = "";
        // Obtenemos los valores de la peticion.
        const { id } = req.params;
        const { userRole } = req.user;
        // Si eres un admin puedes actualizar el perfil de cualquier usuario.
        if (userRole === 'admin') patchUserByIdModelResponse = await this.model.patchUser({ id, user: result.data });
        // Solo el usuario logueado es quien puede actualizar su propio perfil a parte de los administradores.
        const { userId } = req.user;
        if (id === userId) patchUserByIdModelResponse = await this.model.patchUser({ id, user: result.data });
        else return res.status(403).json({ message: `${FORBIDDEN_403_MESSAGE} No tienes permiso para actualizar este perfil.` });
        // Enviamos el error con el mensaje correspondiente.
        if (patchUserByIdModelResponse === false) return res.status(500).json({ message: INTERNAL_SERVER_ERROR_500_MESSAGE });
        // Enviamos la respuesta obtenida.
        return res.status(200).json(patchUserByIdModelResponse);
    }
    // Funcion asincrona para eliminar un usuario.
    deleteUser = async (req, res) => {
        let deleteUserByIdModelResponse = "";
        const { id } = req.params;
        // Si eres un admin puedes eliminar el perfil de cualquier usuario.
        const { userRole } = req.user;
        if (userRole === 'admin') deleteUserByIdModelResponse = await this.model.deleteUser(id);
        // Solo el usuario logueado es quien puede eliminar su propio perfil a parte de los administradores.
        const { userId } = req.user;
        if (id === userId) deleteUserByIdModelResponse = await this.model.deleteUser(id);
        else return res.status(403).json({ message: `${FORBIDDEN_403_MESSAGE} No tienes permiso para eliminar este perfil.` });
        // Enviamos el error con el mensaje correspondiente.
        if (deleteUserByIdModelResponse === false) return res.status(500).json({ message: INTERNAL_SERVER_ERROR_500_MESSAGE });
        // Enviamos la respuesta obtenida.
        return res.status(200).json(deleteUserByIdModelResponse);
    }
}