import { Donaciones } from '../Model/Donaciones.js';
import { Restaurant } from '../../Restaurants/Model/Restaurant.js';
import { Op } from 'sequelize';
import moment from 'moment';

export const GetTodayDonationsController = async (req, res) => {
    try {
        // Obtener la fecha de hoy
        const today = moment().startOf('day').toDate();
        const tomorrow = moment(today).add(1, 'days').toDate();

        // Consultar las donaciones de hoy
        const donaciones = await Donaciones.findAll({
            where: {
                fecha_publicacion: {
                    [Op.between]: [today, tomorrow]
                }
            },
            include: [
                {
                    model: Restaurant,
                    attributes: ['nombre', 'direccion']
                }
            ]
        });

        res.status(200).json(donaciones);
    } catch (error) {
        console.error('Error fetching today\'s donations:', error);
        res.status(500).json({
            message: 'Error fetching today\'s donations',
            error
        });
    }
};
