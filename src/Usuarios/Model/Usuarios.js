import { sequelize } from '../../Database/database.js';
import { DataTypes } from 'sequelize';

const Usuarios = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    genero: {
        type: DataTypes.ENUM('masculino', 'femenino', 'otro'),
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    id_recogida: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'usuarios'
});

export { Usuarios };
