/* Cuando se hace clic en el link no se muestra ninguna página web,
    simplemente se descarga el archivo o recurso solicitado en el dispositivo que solicita la petición.
    También añade que esos recursos o archivos en node sean guardados definitivamente es decir como un servidor el cual se dedica a alojar recursos y
    enviarlos a quien los solicite. VERIFICAR SI SE GUARDARAN LOCALMENTE
*/
// Modulos de node.
import path from 'path';
import fs from 'fs';
// Directorio donde se almacenan los archivos//
const FILES_DIRECTORY = path.join(__dirname, 'files');//downloads/files
// Middleware para asegurar que el directorio existe
if (!fs.existsSync(FILES_DIRECTORY)) {
    console.error(`El directorio de archivos no existe: ${FILES_DIRECTORY}`);
    process.exit(1); // Salir si el directorio no existe
}
/**
 * Ruta para descargar un archivo específico
 * Ejemplo: GET /download/archivo.txt
 */
export async function getFile(req, res) {
    const filename = req.params.filename;
    const filePath = path.join(FILES_DIRECTORY, filename);
    // Verifica si el archivo solicitado existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Archivo no encontrado: ${filename}`);
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        // Sirve el archivo para descarga
        res.download(filePath, filename, (downloadErr) => {
            if (downloadErr) {
                console.error(`Error al descargar el archivo: ${filename}`, downloadErr);
                res.status(500).json({ error: 'Error al procesar la descarga' });
            }
        });
    });
}