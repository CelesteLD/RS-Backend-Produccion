import { RegistroRecogida } from '../Model/RegistroRecogida.js';

export const GetNumberOfEntregasByIDRestaurantController = async (req, res) => {
    const { id_restaurante } = req.params;

    try {
        const count = await RegistroRecogida.count({
            where: { id_restaurante }
        });

        res.status(200).json({ count });
    } catch (error) {
        console.error('Error al obtener el número de entregas:', error);
        res.status(500).json({ message: 'Error al obtener el número de entregas' });
    }
};
