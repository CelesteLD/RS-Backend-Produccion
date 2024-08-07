import { DataTypes } from 'sequelize';
import { sequelize } from '../../Database/database.js'; // Asegúrate de que la ruta a tu configuración de Sequelize sea correcta

const NoticiasRoute = sequelize.define('NoticiasRoute', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_noticia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'noticias_routes',
  timestamps: false
});

export { NoticiasRoute };
