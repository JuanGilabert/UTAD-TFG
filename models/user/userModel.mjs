import { act } from 'react';
// Modulos de node.
import { hash, genSalt } from 'bcrypt';
import { randomUUID } from 'node:crypto';
// Modulos locales.
import { connectDB } from '../../services/database/connection/mongoDbConnection.mjs';
import { checkIfUserExistsFunction } from '../../services/database/functions/mongoDbFunctions.mjs';
// Importamos los hooks necesarios como el hook despues de registrar un usuario.
import { afterUserRegisterHook } from '../../hooks/afterUserRegisterHook.mjs';
// Importamos los valores de las configuraciones necesarias.
import {
    USER_COLLECTION_NAME, HASH_SALT_ROUNDS, ADMIN_ROLE_PASSWORD,
    ADMIN_ROLE_VALUE, USER_ROLE_VALUE, RETURN_DOCUMENT_AFTER_VALUE
} from '../../config/GenericEnvConfig.mjs';
//// Exportamos la clase UserModel
export class UserModel {
    // Funcion asincrona para obtener todos los usuarios.
    static async getAllUsers() {
        const db = await connectDB();
        const users = await db.collection(USER_COLLECTION_NAME).find({}).toArray();
        return users || false;
    }
    // Funcion asincrona para obtener un usuario por su id.
    static async getUserById(userId, userRole) {
        const db = await connectDB();
        // Devolvemos el usuario en caso de haberlo, si no existe la respueata sera null.
        return userRole === ADMIN_ROLE_VALUE ? await db.collection(USER_COLLECTION_NAME).findOne({ _id: userId })
        : await db.collection(USER_COLLECTION_NAME).findOne(
            { _id: userId }, { projection: { userRole: 0, userJWT: 0, userActive: 0 } }
        );
    }
    // Funcion asincrona para crear un nuevo usuario.
    static async postUser({ userName, userPassword, userEmail }) {
        const db = await connectDB();
        // Comprobamos que no exista el email para poder registrar al usuario. Si existe, devolvemos un error.
        const userEmailExists = await checkIfUserExistsFunction(userEmail);
        if (userEmailExists) return { type: "Email", message: "El email indicado ya existe. Introduzca otro distinto." };
        // Rezlizamos el hash de la contraseña recibida con el salt correspondiente.
        const saltRounds = await genSalt(HASH_SALT_ROUNDS);
        const hashedPassword = await hash(userPassword, saltRounds);
        // Verificamos si la contraseña contiene la validacion para tener rol de admin o no.
        const userRole = userPassword.includes(ADMIN_ROLE_PASSWORD) ? ADMIN_ROLE_VALUE : USER_ROLE_VALUE;
        const isUserAcountActive = userRole === ADMIN_ROLE_VALUE ? true : false;
        // Creamos el nuevo usuario con los valores correspondientes.
        const newUser = {
            _id: randomUUID(), userName, userPassword: hashedPassword, userEmail,
            userRole, userJWT: "", userActive: isUserAcountActive
        };
        // Guardamos el nuevo usuario en la base de datos.
        const { acknowledged, insertedId } = await db.collection(USER_COLLECTION_NAME).insertOne(newUser);
        // Si el usuario se ha creado y no es un admin, entonces enviamos el correo de bienvenida.
        if (acknowledged && userRole === USER_ROLE_VALUE) {
            // Enviamos el correo al usuario.
            const { success, message } = await afterUserRegisterHook(userEmail);
            //
            success ? console.log(`Email: ${message}`)
            : afterUserRegisterHook(userEmail);// Problemas al no recoger aqui los valores del nuevo envio de correo.
        }
        return acknowledged ? { id: insertedId, ...newUser } : { type: "Error", message: "Error al crear el usuario." };
    }
    // Funcion asincrona para actualizar un usuario.
    static async putUser({ id, user, userRole }) {
        const db = await connectDB();
        // Guardamos los nuevos datos del usuario.
        const updatedUser = {
            ...user,
            userRole,
            userJWT: "",
            _id: id
        };
        // Obtenemos el resultado de la operación de actualización.
        const { value, lastErrorObject, ok } = await db.collection(USER_COLLECTION_NAME).findOneAndReplace(
            { _id: id }, updatedUser,
            { returnDocument: RETURN_DOCUMENT_VALUE, projection: { userRole: 0, userJWT: 0, confirmed: 0 } }
        );
        // Si ok es 0 devolvemos el error obtenido.
        if (!ok && lastErrorObject) throw new Error(`No se pudo actualizar la tarea: ${lastErrorObject}`);
        // Devolvemos false si no hay valor(null).
        if (ok && !value) return false;
        // Devolvemos el documento actualizado.
        if (ok && value) return value;
    }
    // Funcion asincrona para actualizar un usuario.
    static async patchUser({ id, user }) {
        const db = await connectDB();
        // Obtenemos el resultado de la operación de actualización.
        const { value, lastErrorObject, ok } = await db.collection(USER_COLLECTION_NAME).findOneAndUpdate(
            { _id: id }, { $set: { ...user } },
            { returnDocument: RETURN_DOCUMENT_VALUE, projection: { userRole: 0, userJWT: 0 } }
        );
        // Si ok es 0 devolvemos el error obtenido.
        if (!ok && lastErrorObject) throw new Error(`No se pudo actualizar la tarea: ${lastErrorObject}`);
        // Devolvemos false si no hay valor(null).
        if (ok && !value) return false;
        // Devolvemos el documento actualizado.
        if (ok && value) return value;
    }
    // Funcion asincrona para eliminar un usuario.
    static async deleteUser(id) {
        const db = await connectDB();
        // Comprobamos si la respuesta es distinto de null. Si es asi indica que se elimino el usuario con el id recibido.
        // Si es null, indica que no se elimino el usuario con el id recibido debido a
        // (ver si es un error de red o sintactico o si de verdad no existe para saber que devolver en el controlador)
        return (await db.collection(USER_COLLECTION_NAME).findOneAndDelete({ _id: id })) !== null;        
    }
}