import { sequelize } from '../../Database/database.js';
import { DataTypes } from 'sequelize';
import { Usuarios } from '../../Usuarios/Model/Usuarios.js';
import { Restaurant } from '../../Restaurants/Model/Restaurant.js';

const RegistroRecogida = sequelize.define('registros_recogida', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_recogida: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuarios,
            key: 'id_recogida'
        }
    },
    id_restaurante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Restaurant,
            key: 'id'
        }
    },
    fecha_recogida: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'registros_recogida'
});

export { RegistroRecogida };
