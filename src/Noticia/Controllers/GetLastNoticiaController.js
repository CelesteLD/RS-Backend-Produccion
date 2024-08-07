import { Noticia } from '../Model/Noticia.js';

export const GetLastNoticiaController = async (req, res) => {
  try {
    const lastNoticia = await Noticia.findOne({
      order: [['fecha', 'DESC']]
    });

    if (!lastNoticia) {
      return res.status(404).json({ message: 'No se encontró ninguna noticia.' });
    }

    res.status(200).json(lastNoticia);
  } catch (error) {
    console.error('Error al obtener la última noticia:', error);
    res.status(500).json({ message: 'Error al obtener la última noticia' });
  }
};
