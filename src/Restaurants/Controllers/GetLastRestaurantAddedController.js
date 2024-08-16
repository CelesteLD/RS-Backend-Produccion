import { Restaurant } from "../Model/Restaurant.js";

// Obtener el restaurante con el ID más alto
export const GetLastRestaurantAddedController = async (req, res) => {
    try {
        const lastRestaurant = await Restaurant.findOne({
            order: [['id', 'DESC']],
            limit: 1
        });

        if (!lastRestaurant) {
            return res.status(404).send({ message: 'No se encontraron restaurantes' });
        }

        res.status(200).send(lastRestaurant);
    } catch (error) {
        console.error('Error al obtener el último restaurante añadido:', error);
        res.status(500).send({ message: 'Error al obtener el último restaurante añadido' });
    }
};
