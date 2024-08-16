import { RegistroRecogida } from '../Model/RegistroRecogida.js';

export const GetNumberOfRecogidasByIDUserController = async (req, res) => {
    const { id_recogida } = req.params;

    try {
        const count = await RegistroRecogida.count({
            where: { id_recogida }
        });

        res.status(200).json({ count });
    } catch (error) {
        console.error('Error al obtener el número de recogidas:', error);
        res.status(500).json({ message: 'Error al obtener el número de recogidas' });
    }
};
