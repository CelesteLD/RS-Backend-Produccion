import { UsuarioApp } from "../Model/UsuarioApp.js";

export const GetRolUserAppController = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await UsuarioApp.findOne({ where: { username } });

        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        res.status(200).send({ rol: user.rol });
    } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
        res.status(500).send({ message: 'Error al obtener el rol del usuario' });
    }
}
