import { RegistroRecogida } from '../Model/RegistroRecogida.js';
import { Usuarios } from '../../Usuarios/Model/Usuarios.js';

export const GetAllRestaurantEntregas = async (req, res) => {
    const { id_restaurante } = req.params;

    try {
        const entregas = await RegistroRecogida.findAll({
            where: { id_restaurante },
        });

        res.status(200).json(entregas);
    } catch (error) {
        console.error('Error al obtener las entregas del restaurante:', error);
        res.status(500).json({ message: 'Error al obtener las entregas del restaurante' });
    }
};
