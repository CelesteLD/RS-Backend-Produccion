import { Usuarios } from '../Model/Usuarios.js';

export const checkUserController = async (req, res) => {
    const { id_recogida } = req.body;

    if (!id_recogida) {
        return res.status(400).send({ message: 'El campo id_recogida es obligatorio' });
    }

    try {
        const user = await Usuarios.findOne({ where: { id_recogida } });

        if (user) {
            return res.status(200).send({ exists: true, user });
        } else {
            return res.status(404).send({ exists: false });
        }
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        return res.status(500).send({ message: 'Error al verificar el usuario' });
    }
};
