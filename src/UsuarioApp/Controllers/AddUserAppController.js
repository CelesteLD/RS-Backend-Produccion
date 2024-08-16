import { UsuarioApp } from "../Model/UsuarioApp.js";
import { PasswordService } from '../../Auth/Services/PasswordService.js';

export const AddUserAppController = async (req, res) => {
    try {
        const { nombre, username, email, contraseña, rol } = req.body;

        // Verificar que el rol sea válido
        if (!['administrador', 'comercial'].includes(rol)) {
            return res.status(400).send({ message: 'Rol inválido' });
        }

        // Hashear la contraseña antes de almacenarla
        const hashedPassword = await PasswordService.encrypt(contraseña);

        const newUsuario = await UsuarioApp.create({
            nombre,
            username,
            email,
            contraseña: hashedPassword,
            rol
        });

        res.status(201).send(newUsuario);
    } catch (error) {
        // Manejo del error
        console.error('Error al crear el usuario:', error);
        res.status(500).send({ message: 'Error al crear el usuario' });
    }
};
