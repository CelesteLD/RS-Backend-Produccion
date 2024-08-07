import { sequelize } from '../../Database/database.js';
import { DataTypes } from 'sequelize';

// Definir el modelo UsuarioApp
const UsuarioApp = sequelize.define('usuarios_app', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
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
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('administrador', 'comercial'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'usuarios_app'
});

export { UsuarioApp };

