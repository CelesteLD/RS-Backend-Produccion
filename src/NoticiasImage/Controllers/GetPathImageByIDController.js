import { NoticiasRoute } from '../Model/NoticiasRoute.js'; // Ajusta la importación según tu estructura de proyecto

// Controlador para obtener la ruta de la imagen por ID de noticia
export const GetImagePathByNoticiaIDController = async (req, res) => {
  const { id } = req.params; // Obtener el ID de la noticia de los parámetros de la solicitud

  try {
    const noticiaRoute = await NoticiasRoute.findOne({
      where: {
        id_noticia: id
      }
    });

    if (!noticiaRoute) {
      return res.status(404).send({ message: 'No se encontró la imagen para la noticia proporcionada' });
    }

    res.status(200).send({ imagePath: noticiaRoute.image_path });
  } catch (error) {
    console.error('Error al obtener la ruta de la imagen:', error);
    res.status(500).send({ message: 'Error al obtener la ruta de la imagen' });
  }
};
