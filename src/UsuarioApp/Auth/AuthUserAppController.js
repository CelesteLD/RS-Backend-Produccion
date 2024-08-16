import { UsuarioApp } from "../Model/UsuarioApp.js";
import { PasswordService } from "../../Auth/Services/PasswordService.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export const AuthUserAppController = async (req, res) => {
    try {
        const { username, contraseña } = req.body;

        // Buscar el usuario sin filtrar por rol
        const user = await UsuarioApp.findOne({ where: { username } });

        if (!user) {
            return res.status(401).send({ message: 'Credenciales incorrectas' });
        }

        const isPasswordValid = await PasswordService.check(contraseña, user.contraseña);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Credenciales incorrectas' });
        }

        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY no está definido');
        }

        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        const jsonResponse = {
            message: 'Bienvenido',
            data: {
                token,
                rol: user.rol // Incluye el rol en la respuesta
            }
        };

        // Enviar la respuesta JSON al cliente
        res.status(200).send(jsonResponse);
    } catch (error) {
        // Manejo del error
        console.error('Error al autenticar el usuario:', error);
        res.status(500).send({ message: 'Error al autenticar el usuario' });
    }
};
