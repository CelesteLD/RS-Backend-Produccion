import { Restaurant } from "../Model/Restaurant.js";

// DELETE a restaurant by id
export const DeleteRestaurantController = async (req, res) => {
    try {
        const { id } = req.params;
        // Verificar si el restaurante existe
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            // Si el restaurante no existe, enviar un mensaje de error
            return res.status(404).send({ message: 'Restaurant not found' });
        }

        // Si el restaurante existe, proceder a eliminarlo
        await Restaurant.destroy({
            where: {
                id
            }
        });
        res.send('Restaurant deleted');
    } catch (error) {
        // Manejo del error
        console.error('Error al eliminar el restaurante:', error);
        res.status(500).send({ message: 'Error al eliminar el restaurante' });
    }
}