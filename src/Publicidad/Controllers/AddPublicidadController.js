import { Publicidad } from '../Model/Publicidad.js';

export const AddPublicidadController = async (req, res) => {
    const { titulo, descripcion, foto } = req.body;
    try {
        const newPublicidad = await Publicidad.create({
            titulo,
            descripcion,
            foto
        });
        res.status(201).json(newPublicidad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}