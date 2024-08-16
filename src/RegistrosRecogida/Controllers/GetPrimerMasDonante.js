import { RegistroRecogida } from "../Model/RegistroRecogida.js";
import { Restaurant } from "../../Restaurants/Model/Restaurant.js";
import { sequelize } from '../../Database/database.js';

// Get del restaurante más donante
export const GetPrimerMasDonante = async (req, res) => {
    try {
        // Obtener el restaurante con más donaciones
        const topRestaurante = await RegistroRecogida.findOne({
            attributes: [
                'id_restaurante',
                [sequelize.fn('COUNT', sequelize.col('id_restaurante')), 'total']
            ],
            group: ['id_restaurante'],
            order: [[sequelize.literal('total'), 'DESC']],
            limit: 1
        });

        if (topRestaurante) {
            const restaurant = await Restaurant.findByPk(topRestaurante.id_restaurante);
            if (restaurant) {
                res.json({
                    nombre: restaurant.nombre,
                    id_restaurante: restaurant.id,
                    total_donaciones: topRestaurante.dataValues.total
                });
            } else {
                res.status(404).json({ message: "Restaurant not found" });
            }
        } else {
            res.status(404).json({ message: "No donations found" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving top restaurant."
        });
    }
};
