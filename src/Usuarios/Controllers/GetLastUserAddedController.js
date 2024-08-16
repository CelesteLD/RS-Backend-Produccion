import { Usuarios } from '../Model/Usuarios.js';

// Obtener el usuario con el ID más alto
export const GetLastUserAddedController = async (req, res) => {
    try {
        const lastUser = await Usuarios.findOne({
            order: [['id', 'DESC']],
            limit: 1
        });

        if (!lastUser) {
            return res.status(404).send({ message: 'No se encontraron usuarios' });
        }

        res.status(200).send(lastUser);
    } catch (error) {
        console.error('Error al obtener el último usuario añadido:', error);
        res.status(500).send({ message: 'Error al obtener el último usuario añadido' });
    }
};
