import { RegistroRecogida } from '../Model/RegistroRecogida.js';
import { Restaurant } from '../../Restaurants/Model/Restaurant.js';

export const GetRecogidaByIDUser = async (req, res) => {
    const { id_recogida } = req.params;

    try {
        const recogida = await RegistroRecogida.findAll({
            where: { id_recogida },
            include: [
                {
                    model: Restaurant,
                    attributes: ['nombre']
                }
            ]
        });

        res.status(200).json(recogida);
    } catch (error) {
        console.error('Error al obtener la recogida:', error);
        res.status(500).json({ message: 'Error al obtener la recogida' });
    }
};
