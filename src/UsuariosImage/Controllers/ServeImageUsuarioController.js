import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el nombre del archivo actual y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controlador para servir una imagen específica de un usuario
export const ServeImageUsuarioController = (req, res) => {
  const { filename } = req.params;
  const options = {
    root: path.join(__dirname, '../../assets/usuarios'),
    dotfiles: 'deny'
  };

  res.sendFile(filename, options, (err) => {
    if (err) {
      console.error('Error al enviar la imagen:', err);
      res.status(404).send({ message: 'Imagen no encontrada' });
    }
  });
};
