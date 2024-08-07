// src/Usuarios/Controllers/VerifyIfUserExistController.js
import { UsuarioApp } from '../Model/UsuarioApp.js';

export const VerifyIfUserExistController = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'El nombre de usuario es requerido' });
    }

    try {
        const user = await UsuarioApp.findOne({ where: { username } });

        if (user) {
            return res.status(200).json(true);
        } else {
            return res.status(200).json(false);
        }
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        return res.status(500).json({ message: 'Error al verificar el usuario' });
    }
};
