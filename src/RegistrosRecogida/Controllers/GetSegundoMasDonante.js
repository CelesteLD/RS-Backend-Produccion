import { RegistroRecogida } from "../Model/RegistroRecogida.js";
import { Restaurant } from "../../Restaurants/Model/Restaurant.js";
import { sequelize } from '../../Database/database.js';

// Get del segundo restaurante más donante
export const GetSegundoMasDonante = async (req, res) => {
    try {
        const topRestaurantes = await RegistroRecogida.findAll({
            attributes: ['id_restaurante', [sequelize.fn('COUNT', 'id_restaurante'), 'total']],
            group: ['id_restaurante'],
            order: [[sequelize.fn('COUNT', 'id_restaurante'), 'DESC']],
            limit: 2
        });

        if (topRestaurantes.length >= 2) {
            const secondTopRestaurant = topRestaurantes[1];
            const restaurant = await Restaurant.findByPk(secondTopRestaurant.id_restaurante);
            if (restaurant) {
                res.json({
                    nombre: restaurant.nombre,
                    id_restaurante: restaurant.id,
                    total_donaciones: secondTopRestaurant.dataValues.total
                });
            } else {
                res.status(404).json({ message: "Restaurant not found" });
            }
        } else {
            res.status(404).json({ message: "Not enough donations found" });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving second top restaurant."
        });
    }
}
