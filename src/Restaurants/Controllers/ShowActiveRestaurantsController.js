import { Restaurant } from "../Model/Restaurant.js";

// GET all active restaurants
export const GetActiveRestaurantController = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({
            where: { activo: 1 } // Si 'activo' es un número (0 o 1) en tu base de datos
        });
        res.send(restaurants);
    } catch (error) {
        // Manejo del error
        console.error('Error al obtener los restaurantes activos:', error);
        res.status(500).send({ message: 'Error al obtener los restaurantes activos' });
    }
}
