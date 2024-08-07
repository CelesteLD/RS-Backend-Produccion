import { Restaurant } from "../Model/Restaurant.js";

// GET all restaurants
export const GetAllRestaurantController = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.send(restaurants);
    } catch (error) {
        // Manejo del error
        console.error('Error al obtener los restaurantes:', error);
        res.status(500).send({ message: 'Error al obtener los restaurantes' });
    }
}