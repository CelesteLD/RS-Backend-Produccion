import { ImageRoute } from "../Model/ImageRoute.js";
import path from 'path';

// Controlador para insertar la ruta de la imagen y el ID del restaurante
export const AddImageRouteController = async (req, res) => {
    try {
        const { id_restaurante, image_path } = req.body;

        if (!id_restaurante || !image_path) {
            return res.status(400).send({ message: 'ID del restaurante y ruta de la imagen son requeridos' });
        }

        // Extraer el nombre de la imagen de la ruta proporcionada
        const imageName = path.basename(image_path);

        // Insertar la ruta de la imagen y el ID del restaurante en la tabla images_routes
        const imageRoute = await ImageRoute.create({
            id_restaurante: id_restaurante,
            image_path: imageName // Almacenar solo el nombre de la imagen
        });

        res.status(201).send({ imageName });
    } catch (error) {
        console.error('Error al añadir la ruta de la imagen:', error);
        res.status(500).send({ message: 'Error al añadir la ruta de la imagen' });
    }
};
