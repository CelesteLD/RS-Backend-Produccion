import { Noticia } from '../Model/Noticia.js';

export const CreateNoticiaController = async (req, res) => {
    const { titulo, descripcion, foto } = req.body; // Añadimos 'foto' al destructuring
    try {
        const newNoticia = await Noticia.create({
            titulo,
            descripcion,
            foto // Incluimos 'foto' en la creación de la noticia
        });
        res.status(201).json(newNoticia);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
