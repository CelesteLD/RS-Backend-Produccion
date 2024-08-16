import { PublicidadRoutes } from '../Model/PublicidadRoutes.js'; // Ajusta la importación según tu estructura de proyecto

// Controlador para obtener la ruta de la imagen por ID de publicidad
export const GetImagePathByPublicidadIDController = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la publicidad de los parámetros de la solicitud

  try {
    const publicidadRoute = await PublicidadRoutes.findOne({
      where: {
        id_publicidad: id
      }
    });

    if (!publicidadRoute) {
      return res.status(404).send({ message: 'No se encontró la imagen para la publicidad proporcionada' });
    }

    res.status(200).send({ imagePath: publicidadRoute.image_path });
  } catch (error) {
    console.error('Error al obtener la ruta de la imagen:', error);
    res.status(500).send({ message: 'Error al obtener la ruta de la imagen' });
  }
};
