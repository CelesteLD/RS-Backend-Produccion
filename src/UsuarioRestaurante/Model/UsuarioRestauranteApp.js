// Model for usuarios_app
import { sequelize } from '../../Database/database.js';
import { DataTypes } from 'sequelize';

// Model for usuarios_restaurantes_app
const UsuarioRestauranteApp = sequelize.define('usuarios_restaurantes_app', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_restaurante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'restaurantes',
            key: 'id'
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'usuarios_restaurantes_app'
});

export { UsuarioRestauranteApp };