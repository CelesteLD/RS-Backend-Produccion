import { ImageRoute } from '../Model/ImageRoute.js'; // Ajusta la importación según tu estructura de proyecto

// Controlador para obtener la ruta de la imagen por ID de restaurante
export const GetImagePathByRestaurantIDController = async (req, res) => {
  const { id } = req.params; // Obtener el ID del restaurante de los parámetros de la solicitud

  try {
    const imageRoute = await ImageRoute.findOne({
      where: {
        id_restaurante: id
      }
    });

    if (!imageRoute) {
      return res.status(404).send({ message: 'No se encontró la imagen para el restaurante proporcionado' });
    }

    res.status(200).send({ imagePath: imageRoute.image_path });
  } catch (error) {
    console.error('Error al obtener la ruta de la imagen:', error);
    res.status(500).send({ message: 'Error al obtener la ruta de la imagen' });
  }
};
