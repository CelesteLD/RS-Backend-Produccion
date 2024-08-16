import { RegistroRecogida } from '../Model/RegistroRecogida.js';
import { Donaciones } from '../../Donaciones/Model/Donaciones.js';

export const AddRegistroRecogidaByIDController = async (req, res) => {
    try {
        const { id_recogida, id_restaurante } = req.body;

        if (!id_recogida || !id_restaurante) {
            return res.status(400).send({ message: 'id_recogida y id_restaurante son requeridos' });
        }

        // Primero, verificar si hay donaciones disponibles para el restaurante
        const donacion = await Donaciones.findOne({
            where: { id_restaurante },
            order: [['fecha_publicacion', 'DESC']]
        });

        if (!donacion) {
            return res.status(404).send({ message: 'No se encontraron donaciones para este restaurante' });
        }

        if (donacion.cantidad <= 0) {
            return res.status(400).send({ message: 'No hay suficientes donaciones para registrar la recogida' });
        }

        // Si hay donaciones disponibles, crear el registro de recogida
        const newRegistroRecogida = await RegistroRecogida.create({
            id_recogida,
            id_restaurante,
            fecha_recogida: new Date()
        });

        // Restar 1 a la columna "cantidad" de la donación más reciente
        donacion.cantidad -= 1;
        await donacion.save();

        res.status(201).send({
            message: 'Entrega registrada correctamente',
            registroRecogida: newRegistroRecogida,
            donacionActualizada: donacion
        });
    } catch (error) {
        console.error('Error al crear el registro de recogida:', error);
        res.status(500).send({ message: 'Error al crear el registro de recogida' });
    }
};