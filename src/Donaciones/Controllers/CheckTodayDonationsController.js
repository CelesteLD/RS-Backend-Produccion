import { Donaciones } from '../Model/Donaciones.js';
import { Op } from 'sequelize';

export const CheckTodayDonationsController = async (req, res) => {
    const { id_restaurante } = req.params;

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const donations = await Donaciones.findAll({
            where: {
                id_restaurante: id_restaurante,
                fecha_publicacion: {
                    [Op.gte]: today,
                    [Op.lt]: tomorrow
                }
            }
        });

        if (donations.length > 0) {
            res.json({ hasDonationsToday: true });
        } else {
            res.json({ hasDonationsToday: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking donations for today', error });
    }
};
