import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener el nombre del archivo actual y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio donde se guardarán las imágenes de usuarios
const imageDirectory = path.join(__dirname, '../../assets/usuarios');

// Crear el directorio si no existe
if (!fs.existsSync(imageDirectory)) {
  fs.mkdirSync(imageDirectory, { recursive: true });
}

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDirectory);
  },
  filename: (req, file, cb) => {
    const currentDate = new Date().toISOString().replace(/:/g, '-'); // Formato de fecha y hora actual
    const sanitizedFilename = file.originalname.replace(/\s+/g, '_'); // Reemplaza espacios por guiones bajos
    cb(null, `${currentDate}-${sanitizedFilename}`); // Combinar fecha actual con el nombre del archivo
  }
});

const upload = multer({ storage: storage }).single('imagen'); // Asegúrate de que este campo sea 'imagen'

// Controlador para subir una imagen de usuario
export const UploadUsuarioImageController = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error al subir la imagen:', err);
      return res.status(500).send({ message: 'Error al subir la imagen' });
    }

    res.status(201).send({ path: `/assets/usuarios/${req.file.filename}` }); // Devolver la ruta de la imagen subida
  });
};
