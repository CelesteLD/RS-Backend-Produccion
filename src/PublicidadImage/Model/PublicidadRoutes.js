import { sequelize } from '../../Database/database.js';
import { DataTypes } from 'sequelize';
import { Publicidad } from '../../Publicidad/Model/Publicidad.js';

const PublicidadRoutes = sequelize.define('publicidad_routes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_publicidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Publicidad,
            key: 'id_publicidad'
        },
        onDelete: 'CASCADE'
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'publicidad_routes'
});

export { PublicidadRoutes };