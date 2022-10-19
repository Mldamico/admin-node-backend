import { DataTypes } from "sequelize";
import { sequelize } from "../db/client.js";

export const Operation = sequelize.define(
  "management",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    timestamps: true,
  }
)
