import { Restaurant } from "../Model/Restaurant.js";

export const ChangeActiveRestaurantController = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurante no encontrado' });
        }

        // Si "activo" es true, cambiar a false y viceversa
        restaurant.activo = !restaurant.activo;
        await restaurant.save();

        res.send({ message: 'Restaurante actualizado' });
    } catch (error) {
        // Manejo del error
        console.error('Error al cambiar el estado del restaurante:', error);
        res.status(500).send({ message: 'Error al cambiar el estado del restaurante' });
    }
}
