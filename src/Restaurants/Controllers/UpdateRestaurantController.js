import { Restaurant } from '../Model/Restaurant.js';

export const UpdateRestaurantController = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, id_municipio, descripcion, telefono, horario_donacion_inicio, horario_donacion_fin, capacidad_donacion, activo } = req.body;

  try {
    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).send({ message: 'Restaurante no encontrado' });
    }

    // Actualizar la información del restaurante
    restaurant.nombre = nombre;
    restaurant.direccion = direccion;
    restaurant.id_municipio = id_municipio;
    restaurant.descripcion = descripcion;
    restaurant.telefono = telefono;
    restaurant.horario_donacion_inicio = horario_donacion_inicio;
    restaurant.horario_donacion_fin = horario_donacion_fin;
    restaurant.capacidad_donacion = capacidad_donacion;
    restaurant.activo = activo;

    await restaurant.save();

    res.status(200).send({ message: 'Restaurante actualizado exitosamente', restaurant });
  } catch (error) {
    console.error('Error al actualizar el restaurante:', error);
    res.status(500).send({ message: 'Error al actualizar el restaurante' });
  }
};
