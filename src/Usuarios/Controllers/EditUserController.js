import { Usuarios } from '../Model/Usuarios.js';

export const EditUserController = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido1, apellido2, fecha_nacimiento, genero } = req.body;

  try {
    const usuario = await Usuarios.findByPk(id);

    if (!usuario) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    // Actualizar la información del usuario excepto el campo "activo"
    usuario.nombre = nombre;
    usuario.apellido1 = apellido1;
    usuario.apellido2 = apellido2;
    usuario.fecha_nacimiento = fecha_nacimiento;
    usuario.genero = genero;

    await usuario.save();

    res.status(200).send({ message: 'Usuario actualizado exitosamente', usuario });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).send({ message: 'Error al actualizar el usuario' });
  }
};
