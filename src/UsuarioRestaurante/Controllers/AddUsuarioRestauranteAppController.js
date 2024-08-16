import { UsuarioRestauranteApp } from "../Model/UsuarioRestauranteApp.js";
import { PasswordService } from '../../Auth/Services/PasswordService.js';

export const AddUsuarioRestauranteAppController = async (req, res) => {
    try {
        const { id_restaurante, username, email, password } = req.body;

        // Verificar que el id_restaurante sea válido (puedes agregar más validaciones según tu lógica)
        if (!id_restaurante) {
            return res.status(400).send({ message: 'ID de restaurante es requerido' });
        }

        // Verificar que username, email y password no estén vacíos
        if (!username || !email || !password) {
            return res.status(400).send({ message: 'Todos los campos son requeridos' });
        }

        // Hashear la contraseña antes de almacenarla
        const hashedPassword = await PasswordService.encrypt(password);

        const newUsuarioRestaurante = await UsuarioRestauranteApp.create({
            id_restaurante,
            username,
            email,
            password: hashedPassword
        });

        res.status(201).send(newUsuarioRestaurante);
    } catch (error) {
        // Manejo del error
        console.error('Error al crear el usuario de restaurante:', error);
        res.status(500).send({ message: 'Error al crear el usuario de restaurante' });
    }
};
