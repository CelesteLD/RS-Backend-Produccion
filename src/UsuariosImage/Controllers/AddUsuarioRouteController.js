import { UsuariosRoutes } from '../Model/UsuariosRoutes.js';

export const AddUsuarioRouteController = async (req, res) => {
  const { id_usuario, image_path } = req.body;

  try {
    // Validar que id_usuario e image_path no sean nulos
    if (!id_usuario || !image_path) {
      return res.status(400).json({ message: 'id_usuario e image_path son requeridos' });
    }

    // Extraer el nombre del archivo de la ruta completa
    const imageName = image_path.split('/').pop();

    // Crear la ruta del usuario
    const newRoute = await UsuariosRoutes.create({
      id_usuario,
      image_path: imageName
    });

    // Responder con la nueva ruta creada
    res.status(201).json(newRoute);
  } catch (error) {
    console.error('Error al añadir la ruta del usuario:', error);
    res.status(500).json({ message: 'Error al añadir la ruta del usuario' });
  }
};
