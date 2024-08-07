import { Restaurant } from "../Model/Restaurant.js";
// POST to add a new restaurant
export const CreateRestaurantController = async (req, res) => {
    try {
        const {
            nombre,
            direccion,
            descripcion,
            telefono,
            horario_donacion_inicio,
            horario_donacion_fin,
            capacidad_donacion,
            id_municipio,
            activo // Añadido el campo activo
        } = req.body;

        const newRestaurant = await Restaurant.create({
            nombre,
            direccion,
            descripcion,
            telefono,
            horario_donacion_inicio,
            horario_donacion_fin,
            capacidad_donacion,
            id_municipio,
            activo // Añadido el campo activo
        });

        res.status(201).send(newRestaurant);
    } catch (error) {
        // Manejo del error
        console.error('Error al crear el restaurante:', error);
        res.status(500).send({ message: 'Error al crear el restaurante' });
    }
}