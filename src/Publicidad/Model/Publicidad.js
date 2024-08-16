import { sequelize } from '../../Database/database.js';
import { DataTypes } from 'sequelize';

const Publicidad = sequelize.define('publicidad', {
    id_publicidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    foto: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false,
    tableName: 'publicidad'
});

export { Publicidad };
