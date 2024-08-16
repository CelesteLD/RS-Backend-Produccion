import { DataTypes } from 'sequelize';
import { sequelize } from '../../Database/database.js'; // Asegúrate de que la ruta a tu configuración de Sequelize sea correcta

const Noticia = sequelize.define('Noticia', {
  id_noticia: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
  tableName: 'noticias',
  timestamps: false
});

export { Noticia };
