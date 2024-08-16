import { Publicidad } from '../Model/Publicidad.js';

export const GetAllPublicidadController = async (req, res) => {
    try {
        const publicidad = await Publicidad.findAll();
        res.status(200).json(publicidad);
    } catch (error) {
        console.error('Error al obtener publicidad:', error);
        res.status(500).json({ message: 'Error al obtener publicidad' });
    }
};

