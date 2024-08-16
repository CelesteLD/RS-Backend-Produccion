import { Usuarios } from "../Model/Usuarios.js";

export const ChangeActiveUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuarios.findOne({ where: { id } });

        if (!usuario) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Si "activo" es true, cambiar a false y viceversa
        usuario.activo = !usuario.activo;
        await usuario.save();

        res.send({ message: 'Estado del usuario actualizado' });
    } catch (error) {
        // Manejo del error
        console.error('Error al cambiar el estado del usuario:', error);
        res.status(500).send({ message: 'Error al cambiar el estado del usuario' });
    }
};
