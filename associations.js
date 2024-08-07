import { Donaciones } from './src/Donaciones/Model/Donaciones.js';
import { Restaurant } from './src/Restaurants/Model/Restaurant.js';
import { RegistroRecogida } from './src/RegistrosRecogida/Model/RegistroRecogida.js';
import { Usuarios } from './src/Usuarios/Model/Usuarios.js';

// Asociaciones entre Donaciones y Restaurant
Donaciones.belongsTo(Restaurant, { foreignKey: 'id_restaurante' });
Restaurant.hasMany(Donaciones, { foreignKey: 'id_restaurante' });

// Asociaciones entre Usuarios y RegistroRecogida
Usuarios.hasMany(RegistroRecogida, { foreignKey: 'id_recogida' });
RegistroRecogida.belongsTo(Usuarios, { foreignKey: 'id_recogida', as: 'usuario' });

// Asociaciones entre Restaurant y RegistroRecogida
Restaurant.hasMany(RegistroRecogida, { foreignKey: 'id_restaurante' });
RegistroRecogida.belongsTo(Restaurant, { foreignKey: 'id_restaurante' });