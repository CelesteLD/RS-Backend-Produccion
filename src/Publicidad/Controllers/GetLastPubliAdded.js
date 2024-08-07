import { Publicidad } from '../Model/Publicidad.js';

export const GetLastPublicidadController = async (req, res) => {
  try {
    const lastPublicidad = await Publicidad.findOne({
      order: [['fecha', 'DESC']]
    });

    if (!lastPublicidad) {
      return res.status(404).json({ message: 'No se encontró ninguna publicidad.' });
    }

    res.status(200).json(lastPublicidad);
  } catch (error) {
    console.error('Error al obtener la última publicidad:', error);
    res.status(500).json({ message: 'Error al obtener la última publicidad' });
  }
};
