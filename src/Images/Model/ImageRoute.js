import { DataTypes } from 'sequelize';
import { sequelize } from '../../Database/database.js';

export const ImageRoute = sequelize.define('ImageRoute', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_restaurante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'restaurantes',
      key: 'id'
    }
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'images_routes',
  timestamps: false
});
