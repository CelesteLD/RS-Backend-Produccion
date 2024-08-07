import { Publicidad } from '../Model/Publicidad.js';

// Get las tres últimas publicidades añadidas
export const GetThreeLastPublicidad = async (req, res) => {
    try {
        const lastThreePublicidad = await Publicidad.findAll({
            order: [['fecha', 'DESC']],
            limit: 3
        });
        res.json(lastThreePublicidad);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving the last three publicidades."
        });
    }
};
