import { UsuariosRoutes } from '../Model/UsuariosRoutes.js'; // Ajusta la importación según tu estructura de proyecto

// Controlador para obtener la ruta de la imagen por ID de usuario
export const GetPathImageUsuarioController = async (req, res) => {
  const { id } = req.params; // Obtener el ID del usuario de los parámetros de la solicitud

  try {
    const usuarioRoute = await UsuariosRoutes.findOne({
      where: {
        id_usuario: id
      }
    });

    if (!usuarioRoute) {
      return res.status(404).send({ message: 'No se encontró la imagen para el usuario proporcionado' });
    }

    res.status(200).send({ imagePath: usuarioRoute.image_path });
  } catch (error) {
    console.error('Error al obtener la ruta de la imagen:', error);
    res.status(500).send({ message: 'Error al obtener la ruta de la imagen' });
  }
};
