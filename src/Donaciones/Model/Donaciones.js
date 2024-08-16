import { sequelize } from '../../Database/database.js';
import { DataTypes } from 'sequelize';
import { Restaurant } from '../../Restaurants/Model/Restaurant.js';  // Importar el modelo de Restaurant

const Donaciones = sequelize.define('donaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_restaurante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'restaurantes', // Nombre de la tabla con la que se crea la relación
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW // Para que los nuevos registros tengan la fecha actual por defecto
    },
    observaciones: {
        type: DataTypes.STRING,
        allowNull: true // Puede ser vacío
    },
    desde_hora: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hasta_hora: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'donaciones'
});

export { Donaciones };
