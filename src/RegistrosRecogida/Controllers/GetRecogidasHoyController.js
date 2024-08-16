import {RegistroRecogida} from '../Model/RegistroRecogida.js'
import { Op } from 'sequelize';

export const GetRecogidasHoyController = async (req, res) => {
  const { id_recogida } = req.params;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const count = await RegistroRecogida.count({
      where: {
        id_recogida,
        fecha_recogida: {
          [Op.gte]: today,
          [Op.lt]: tomorrow
        }
      }
    });

    res.status(200).send({ count });
  } catch (error) {
    console.error('Error al obtener las recogidas de hoy:', error);
    res.status(500).send({ message: 'Error al obtener las recogidas de hoy' });
  }
};
