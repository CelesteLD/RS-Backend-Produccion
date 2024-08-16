import { NoticiasRoute } from '../Model/NoticiasRoute.js';

export const AddNoticiaRouteController = async (req, res) => {
  const { id_noticia, image_path } = req.body;

  try {
    // Validar que id_noticia y image_path no sean nulos
    if (!id_noticia || !image_path) {
      return res.status(400).json({ message: 'id_noticia e image_path son requeridos' });
    }

    // Crear la ruta de la noticia
    const newRoute = await NoticiasRoute.create({
      id_noticia,
      image_path
    });

    // Responder con la nueva ruta creada
    res.status(201).json(newRoute);
  } catch (error) {
    console.error('Error al añadir la ruta de la noticia:', error);
    res.status(500).json({ message: 'Error al añadir la ruta de la noticia' });
  }
};
