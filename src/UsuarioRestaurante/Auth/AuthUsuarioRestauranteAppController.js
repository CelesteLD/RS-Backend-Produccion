import { UsuarioRestauranteApp } from "../Model/UsuarioRestauranteApp.js";
import { PasswordService } from "../../Auth/Services/PasswordService.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export const AuthUsuarioRestauranteAppController = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log (req.body);
        
        // Buscar el usuario por username
        const user = await UsuarioRestauranteApp.findOne({ where: { username } });

        if (!user) {
            return res.status(401).send({ message: 'Credenciales incorrectas' });
        }

        // Verificar la contraseña
        const isPasswordValid = await PasswordService.check(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Credenciales incorrectas' });
        }

        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY no está definido');
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, id_restaurante: user.id_restaurante }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        const jsonResponse = {
            message: 'Bienvenido',
            data: {
                token,
                id_restaurante: user.id_restaurante // Incluye el id_restaurante en la respuesta
            }
        };

        // Enviar la respuesta JSON al cliente
        res.status(200).send(jsonResponse);
    } catch (error) {
        // Manejo del error
        console.error('Error al autenticar el usuario de restaurante:', error);
        res.status(500).send({ message: 'Error al autenticar el usuario de restaurante' });
    }
};