import { sequelize } from '../../Database/database.js';
import { DataTypes } from 'sequelize';
import { Usuarios } from '../../Usuarios/Model/Usuarios.js'; // Ajusta esta importación según la estructura de tu proyecto

const UsuariosRoutes = sequelize.define('usuarios_routes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuarios,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'usuarios_routes'
});

export { UsuariosRoutes };
