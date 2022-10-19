import { DataTypes } from "sequelize";
import { sequelize } from "../db/client.js";

export const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }
)
