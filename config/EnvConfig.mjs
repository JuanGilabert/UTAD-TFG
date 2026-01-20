// Carga de dotenv por seguridad.
import dotenv from 'dotenv';
dotenv.config(); // DotenvConfigOptions.path = `path.resolve(process.cwd(), '.env')`
// Modulos de node.
import { ReturnDocument } from 'mongodb';
//// Base de datos
//  Configuraciones relacionadas con la base de datos.
const DB_USER = encodeURIComponent(process.env.DB_USER);
const DB_PWD = encodeURIComponent(process.env.DB_PWD);
const DB_HOST = process.env.DB_HOST;
export const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_HOST}/?retryWrites=true&w=majority&appName=Cluster0`;
export const DB_NAME = process.env.DB_NAME;
export const RETURN_DOCUMENT_VALUE = ReturnDocument.DEFAULT;
export const RETURN_DOCUMENT_AFTER_VALUE = ReturnDocument.AFTER;
// Nombres de las colecciones.
export const CINEMA_COLLECTION_NAME = process.env.CINEMA_COLLECTION_NAME;
export const MUSIC_COLLECTION_NAME = process.env.MUSIC_COLLECTION_NAME;
export const PAINTING_COLLECTION_NAME = process.env.PAINTING_COLLECTION_NAME;
export const USER_COLLECTION_NAME = process.env.USER_COLLECTION_NAME;
export const FASHION_COLLECTION_NAME = process.env.FASHION_COLLECTION_NAME;
export const FOOD_COLLECTION_NAME = process.env.FOOD_COLLECTION_NAME;
export const MEDICAL_APPOINTMENT_COLLECTION_NAME = process.env.MEDICAL_APPOINTMENT_COLLECTION_NAME;
export const MEDICAMENT_COLLECTION_NAME = process.env.MEDICAMENT_COLLECTION_NAME;
export const MEETING_COLLECTION_NAME = process.env.MEETING_COLLECTION_NAME;
export const SPORT_COLLECTION_NAME = process.env.SPORT_COLLECTION_NAME;
export const TRAVEL_COLLECTION_NAME = process.env.TRAVEL_COLLECTION_NAME;
export const WORK_COLLECTION_NAME = process.env.WORK_COLLECTION_NAME;
// Users Roles
export const ADMIN_ROLE_VALUE = process.env.ADMIN_ROLE_VALUE;
export const USER_ROLE_VALUE = process.env.USER_ROLE_VALUE;


//// Zod Validation Configuration
// Definimos la expresión regular que valida el id recibido en losparametros de una request.
export const RANDOM_UUIDv4_REGEX = process.env.RANDOM_UUIDv4_REGEX;
// Definimos la expresion regular que valida si una url de una pagina web es valida.
export const WEB_URL_REGEX = process.env.WEB_URL_REGEX;
// Definimos la expresion regular que valida si un token tiene el formato correcto.
export const TOKEN_REGEX = process.env.TOKEN_REGEX;
// Definimos el Regex para validar un email.
export const EMAIL_REGEX = process.env.EMAIL_REGEX;
// Definimos el Regex para validar un password.
export const PASSWORD_REGEX = process.env.PASSWORD_REGEX;
// Definimos la expresión regular para validar la fecha en los validadores de los modelos/schemas.
export const DATE_ISO8601_REGEX = process.env.DATE_ISO8601_REGEX;
// Definimos el regex que valida la url de un video de youtube.
export const YOUYUBE_VIDEO_URL_REGEX = process.env.YOUYUBE_VIDEO_URL_REGEX;
// Límite seguro para campos string normales como descripciones o notas de las tareas o eventos.
export const MAX_STRING_DESCRIPTION_VALUE = process.env.MAX_STRING_DESCRIPTION_VALUE;
// Límite seguro para campos string normales como nombres, titulos o lugares/direcciones de las tareas o eventos.
export const MAX_STRING_TITLE_VALUE = process.env.MAX_STRING_TITLE_VALUE;
// Número máximo razonable de actores Numero maximo razonable de valores en los arrays.
export const MAX_ARRAY_VALUE = process.env.MAX_ARRAY_VALUE;
// Numero mínimo para cualquier campo que no sea una fecha.
export const MIN_FIELD_VALUE = process.env.MIN_FIELD_VALUE;
// Numero maximo para la duracion de tareas o eventos. 24 horas como máximo.
export const MAX_DURATION_VALUE = process.env.MAX_DURATION_VALUE;
// Precio límite alto para entradas
export const MAX_FLOAT_VALUE = process.env.MAX_FLOAT_VALUE;


//// Security
// Puerto de escucha. Forzamos base 10 para evitar cosas raras como 0x10.
export const SERVER_BIND_PORT = parseInt(process.env.SERVER_BIND_PORT, 10) || 0;
// Admin credentials.
export const ADMIN_ROLE_PASSWORD = process.env.ADMIN_ROLE_PASSWORD;
// Hash Salt Rounds.
export const HASH_SALT_ROUNDS = parseInt(process.env.HASH_SALT_ROUNDS);
// JWT Service.
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// Email Service
export const EMAIL_SERVICE_USER = process.env.EMAIL_SERVICE_USER;
export const EMAIL_SERVICE_PASSWORD = process.env.EMAIL_SERVICE_PASSWORD;
export const EMAIL_SERVICE_HOST = process.env.EMAIL_SERVICE_HOST;
export const EMAIL_SERVICE_SIGNUP_SUBJECT = process.env.EMAIL_SERVICE_SUBJECT;
export const EMAIL_SERVICE_DELETE_ACCOUNT_SUBJECT = process.env.EMAIL_SERVICE_DELETE_ACCOUNT_SUBJECT;
// Mensajes HTTP de tipo Success 2xx.
export const OKEY_200_MESSAGE = process.env.OKEY_200_MESSAGE;
export const CREATED_201_MESSAGE = process.env.CREATED_201_MESSAGE;
export const NO_CONTENT_204_MESSAGE = process.env.NO_CONTENT_204_MESSAGE;
// Mensajes HTTP de tipo Redirection 3xx.
export const MOVED_PERMANENTLY_301_MESSAGE = process.env.MOVED_PERMANENTLY_301_MESSAGE;
export const TEMPORARY_REDIRECT_307_MESSAGE = process.env.TEMPORARY_REDIRECT_307_MESSAGE;
// Mensajes HTTP de tipo Client Error 4xx.
export const BAD_REQUEST_400_MESSAGE = process.env.BAD_REQUEST_400_MESSAGE;
export const BAD_REQUEST_400_QUERY_MESSAGE = process.env.BAD_REQUEST_400_QUERY_MESSAGE;
export const UNAUTHORIZED_401_MESSAGE = process.env.UNAUTHORIZED_401_MESSAGE;
export const FORBIDDEN_403_MESSAGE = process.env.FORBIDDEN_403_MESSAGE;
export const NOT_FOUND_404_MESSAGE = process.env.NOT_FOUND_404_MESSAGE;
export const NOT_FOUND_404_QUERY_MESSAGE = process.env.NOT_FOUND_404_QUERY_MESSAGE;
export const NOT_ACCEPTABLE_406_MESSAGE = process.env.NOT_ACCEPTABLE_406_MESSAGE;
export const CONFLICT_409_MESSAGE = process.env.CONFLICT_409_MESSAGE;
export const UNPROCESSABLE_ENTITY_422_MESSAGE = process.env.UNPROCESSABLE_ENTITY_422_MESSAGE;
//Mensajes HTTP de tipo Server Error 5xx.
export const INTERNAL_SERVER_ERROR_500_MESSAGE = process.env.INTERNAL_SERVER_ERROR_500_MESSAGE;


//// Routes Configuration
export const API_SERVER_PROCESS_NAME = process.env.API_SERVER_PROCESS_NAME;
export const ITEM_ROUTE_PATH = process.env.ITEM_ROUTE_PATH;
export const TASK_ROUTE_PATH = process.env.TASK_ROUTE_PATH;
export const EVENT_ROUTE_PATH = process.env.EVENT_ROUTE_PATH;// /event Establecer en: fashion, 
export const APPOINTMENT_ROUTE_PATH = process.env.APPOINTMENT_ROUTE_PATH;
export const UNAVAILABLE_DATES_ROUTE_PATH = process.env.UNAVAILABLE_DATES_ROUTE_PATH;
export const IDENTIFIER_ROUTE_PATH = process.env.IDENTIFIER_ROUTE_PATH;
// Admin
export const ADMIN_ROUTE_PATH = process.env.ADMIN_ROUTE_PATH;
export const ADMIN_DOCUMENTATION_ROUTE_PATH = process.env.ADMIN_DOCUMENTATION_ROUTE_PATH;
export const ADMIN_WEB_ROUTE_PATH = process.env.ADMIN_WEB_ROUTE_PATH;
export const ADMIN_AUTH_ROUTE_PATH = process.env.ADMIN_AUTH_ROUTE_PATH;
export const AUTH_SIGNIN_ROUTE_PATH = process.env.SIGNIN_ROUTE_PATH;
export const AUTH_SIGNOUT_ROUTE_PATH = process.env.SIGNOUT_ROUTE_PATH;
export const WEB_SCRAPING_ROUTE_PATH = process.env.WEB_SCRAPING_ROUTE_PATH;
// User
export const USER_ROUTE_PATH = process.env.USER_ROUTE_PATH;
// Art
export const ART_ROUTE_PATH = process.env.ART_ROUTE_PATH;
export const ART_CINEMA_ROUTE_PATH = process.env.ART_CINEMA_ROUTE_PATH;
export const CINEMA_MOVIE_DOWNLOADER_ROUTE_PATH = process.env.CINEMA_MOVIE_DOWNLOADER_ROUTE_PATH;

export const ART_MUSIC_ROUTE_PATH = process.env.ART_MUSIC_ROUTE_PATH;
export const MUSIC_VIDEO_DOWNLOADER_ROUTE_PATH = process.env.MUSIC_VIDEO_DOWNLOADER_ROUTE_PATH;

export const ART_PAINTING_ROUTE_PATH = process.env.ART_PAINTING_ROUTE_PATH;
export const PAINTING_EXPOSURE_ROUTE_PATH = process.env.PAINTING_EXPOSURE_ROUTE_PATH;
// Food
export const FOOD_ROUTE_PATH = process.env.FOOD_ROUTE_PATH;
export const FOOD_RESTAURANT_ROUTE_PATH = process.env.FOOD_RESTAURANT_ROUTE_PATH;
export const FOOD_SHOPPING_LIST_ROUTE_PATH = process.env.FOOD_SHOPPING_LIST_ROUTE_PATH;
// Health
export const HEALTH_ROUTE_PATH = process.env.HEALTH_ROUTE_PATH;
export const HEALTH_MEDICAL_APPOINTMENT_ROUTE_PATH = process.env.HEALTH_MEDICAL_APPOINTMENT_ROUTE_PATH;
// agregar aqui alguna variante de la ruta medical-appointment
export const HEALTH_MEDICAMENT_ROUTE_PATH = process.env.HEALTH_MEDICAMENT_ROUTE_PATH;
export const MEDICAMENT_EXPIRATION_DATE_ROUTE_PATH = process.env.MEDICAMENT_EXPIRATION_DATE_ROUTE_PATH;
// Meeting
export const MEETING_ROUTE_PATH = process.env.MEETING_ROUTE_PATH;// /meeting
// Sport
export const SPORT_ROUTE_PATH = process.env.SPORT_ROUTE_PATH;
export const SPORT_ACTIVITY_ROUTE_PATH = process.env.SPORT_ACTIVITY_ROUTE_PATH;
export const SPORT_ROUTINE_ROUTE_PATH = process.env.SPORT_ROUTINE_ROUTE_PATH;
export const ROUTINE_ESTADISTICS_ROUTE_PATH = process.env.ROUTINE_ESTADISTICS_ROUTE_PATH;
// Travel
export const TRAVEL_ROUTE_PATH = process.env.TRAVEL_ROUTE_PATH;
export const TRAVEL_TRIP_ROUTE_PATH = process.env.TRAVEL_TRIP_ROUTE_PATH;
// Work
export const WORK_ROUTE_PATH = process.env.WORK_ROUTE_PATH;