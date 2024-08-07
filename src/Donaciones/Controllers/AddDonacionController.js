import { Donaciones } from '../Model/Donaciones.js';
import { Op } from 'sequelize';
import { Restaurant } from '../../Restaurants/Model/Restaurant.js'; // Importa el modelo de restaurantes

export const AddDonacionController = async (req, res) => {
    const { id_restaurante, cantidad, observaciones, desde_hora, hasta_hora } = req.body;
    try {
        // Verifica si el restaurante existe
        const restaurante = await Restaurant.findByPk(id_restaurante);
        if (!restaurante) {
            return res.status(400).json({ message: 'El restaurante no existe' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Busca una donación existente para hoy
        let donacion = await Donaciones.findOne({
            where: {
                id_restaurante,
                fecha_publicacion: {
                    [Op.gte]: today,
                    [Op.lt]: tomorrow
                }
            }
        });

        const cantidadNumerica = parseInt(cantidad, 10);

        if (donacion) {
            // Si hay una donación para hoy, suma la cantidad
            const cantidadExistente = parseInt(donacion.cantidad, 10);
            donacion.cantidad = cantidadExistente + cantidadNumerica;
            if (observaciones) {
                donacion.observaciones = observaciones;
            }
            if (desde_hora) {
                donacion.desde_hora = desde_hora;
            }
            if (hasta_hora) {
                donacion.hasta_hora = hasta_hora;
            }
            await donacion.save();
        } else {
            // Si no hay una donación para hoy, crea una nueva
            donacion = await Donaciones.create({
                id_restaurante,
                cantidad: cantidadNumerica,
                observaciones,
                desde_hora,
                hasta_hora
            });
        }

        res.status(201).json({ message: 'Donación añadida con éxito', data: donacion });
    } catch (error) {
        res.status(500).json({ message: 'Error al añadir la donación', error });
    }
};
