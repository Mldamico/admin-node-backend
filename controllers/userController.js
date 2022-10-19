import { User } from "../models/User.js"
import asyncHandler from 'express-async-handler'
import { sequelize } from "../db/client.js"


export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

export const get10LastUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({ limit: 10, order: [['createdAt', 'DESC']] })
  res.json(users)
})
