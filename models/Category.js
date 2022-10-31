import { DataTypes } from "sequelize";
import { sequelize } from "../db/client.js";
import { Operation } from "./Operation.js";




export const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

  },
  {
    timestamps: true,
  }
)


Category.hasMany(Operation, {
  foreignKey: 'categoryId'
})
Operation.belongsTo(Category);