import { Usuarios } from '../Model/Usuarios.js';

// Obtener el usuario con el ID más alto
export const GetUserByIDController = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};
