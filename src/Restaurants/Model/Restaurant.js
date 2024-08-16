import { sequelize } from '../../Database/database.js';
import { DataTypes } from 'sequelize';
import { Donaciones } from '../../Donaciones/Model/Donaciones.js';  // Importar el modelo de Donaciones

const Restaurant = sequelize.define('restaurantes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    horario_donacion_inicio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    horario_donacion_fin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    capacidad_donacion: {
        type: DataTypes.ENUM('diariamente', 'semanalmente', 'mensualmente'),
        allowNull: true
    },
    id_municipio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'municipios', // Nombre de la tabla con la que se crea la relación
            key: 'id'
        }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true // Para que los nuevos registros sean activos por defecto
    }
}, {
    timestamps: false,
    tableName: 'restaurantes'
});

export { Restaurant };
