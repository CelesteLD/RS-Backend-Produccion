import { Usuarios } from '../Model/Usuarios.js'; // Asegúrate de ajustar la ruta según la estructura de tu proyecto

// Función para generar un id_recogida único de 5 dígitos
const generateUniqueIdRecogida = async () => {
    let idRecogida;
    let exists = true;
    while (exists) {
        idRecogida = Math.floor(10000 + Math.random() * 90000).toString(); // Genera un número de 5 dígitos
        // Verifica si el id_recogida ya existe en la base de datos
        const user = await Usuarios.findOne({ where: { id_recogida: idRecogida } });
        if (!user) {
            exists = false; // Si no existe, podemos usar este id_recogida
        }
    }
    return idRecogida;
};

export const AddUsuarioController = async (req, res) => {
    try {
        const { nombre, apellido1, apellido2, fecha_nacimiento, genero, activo = true } = req.body;

        // Verificar que se hayan proporcionado los campos requeridos
        if (!nombre || !apellido1 || !apellido2 || !fecha_nacimiento || !genero || activo === undefined) {
            return res.status(400).send({ message: 'Todos los campos son requeridos' });
        }

        // Generar un id_recogida único de 5 dígitos
        const id_recogida = await generateUniqueIdRecogida();

        // Crear el nuevo usuario
        const newUsuario = await Usuarios.create({
            nombre,
            apellido1,
            apellido2,
            fecha_nacimiento,
            genero,
            activo,
            id_recogida
        });

        // Enviar la respuesta con el nuevo usuario creado
        res.status(201).send(newUsuario);
    } catch (error) {
        // Manejo del error
        console.error('Error al crear el usuario:', error);
        res.status(500).send({ message: 'Error al crear el usuario' });
    }
};
