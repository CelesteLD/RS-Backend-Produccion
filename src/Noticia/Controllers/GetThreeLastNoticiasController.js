import { Noticia } from '../Model/Noticia.js';

// Get las tres últimas noticias añadidas
export const GetThreeLastNoticias = async (req, res) => {
    try {
        const lastThreeNoticias = await Noticia.findAll({
            order: [['fecha', 'DESC']],
            limit: 3
        });
        res.json(lastThreeNoticias);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving the last three noticias."
        });
    }
};
