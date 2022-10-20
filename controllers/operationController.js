
import asyncHandler from 'express-async-handler';
import { Category } from "../models/Category.js";
import { Operation } from '../models/Operation.js';

export const getAllOperationsByIncome = asyncHandler(async (req, res) => {
  const operations = await Operation.findAll({ include: Category, where: { type: "Income", active: true } })
  res.json(operations)
})

export const getAllOperationsByOutcome = asyncHandler(async (req, res) => {
  const operations = await Operation.findAll({ include: Category, where: { type: "Outcome", active: true } })
  res.json(operations)
})


export const getAllOperations = asyncHandler(async (req, res) => {
  const operations = await Operation.findAll({ include: Category, where: { active: true }, order: [["date", 'ASC']] })

  res.json(operations)
})

export const getLast10Operations = asyncHandler(async (req, res) => {
  const operations = await Operation.findAll({ include: Category, where: { active: true }, order: [["date", 'DESC']], limit: 10, })

  res.json(operations)
})



export const addOrExtractOperation = asyncHandler(async (req, res) => {
  const { description, amount, type, categoryId } = req.body;


  if (!description || !amount || !type || !categoryId) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (Number(amount) < 0) {
    return res.status(403).json({ message: "Invalid amount" })
  }

  const management = {
    description, amount, date: new Date(), type, categoryId
  }

  const newManagement = await Operation.create(management)

  res.json(newManagement)

})

export const updateOperation = asyncHandler(async (req, res) => {
  const { description, amount, id } = req.body;


  if (!description || !amount) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (Number(amount) < 0) {
    return res.status(403).json({ message: "Invalid amount" })
  }

  const foundOperation = await Operation.findByPk(id)


  if (!foundOperation || !foundOperation.active) {
    return res.status(401).json({ message: "Couldn't find any operation" })
  }

  await foundOperation.update({ description, amount, date: new Date() }, {
    where: { id }
  })

  res.json({ foundOperation })


})


export const deleteOperation = asyncHandler(async (req, res) => {

  const { id } = req.body;

  const foundOperation = await Operation.findByPk(id)


  if (!foundOperation) {
    return res.status(401).json({ message: "Couldn't find any operation" })
  }

  await foundOperation.update({ active: false }, {
    where: { id }
  })

  res.json({ foundOperation })


})
