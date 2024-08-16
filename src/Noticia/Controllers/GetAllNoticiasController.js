import { Noticia } from '../Model/Noticia.js';

export const GetAllNoticiasController = async (req, res) => {
    try {
        const noticias = await Noticia.findAll();
        res.status(200).json(noticias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};