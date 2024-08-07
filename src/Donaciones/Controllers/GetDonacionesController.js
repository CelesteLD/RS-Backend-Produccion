import { Donaciones } from '../Model/Donaciones.js';
import { Restaurant } from '../../Restaurants/Model/Restaurant.js';

export const GetDonacionesController = async (req, res) => {
    try {
        const donaciones = await Donaciones.findAll({
            include: [{ model: Restaurant, attributes: ['nombre'] }]
        });
        res.status(200).json(donaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las donaciones', error });
    }
};