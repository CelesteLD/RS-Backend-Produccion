import { PublicidadRoutes } from '../Model/PublicidadRoutes.js';

export const AddPublicidadRouteController = async (req, res) => {
  const { id_publicidad, image_path } = req.body;

  try {
    // Validar que id_noticia y image_path no sean nulos
    if (!id_publicidad || !image_path) {
      return res.status(400).json({ message: 'id_publicidad e image_path son requeridos' });
    }

    // Crear la ruta de la noticia
    const newRoute = await PublicidadRoutes.create({
      id_publicidad,
      image_path
    });

    // Responder con la nueva ruta creada
    res.status(201).json(newRoute);
  } catch (error) {
    console.error('Error al añadir la ruta de la publicidad:', error);
    res.status(500).json({ message: 'Error al añadir la ruta de la publicidad' });
  }
};
