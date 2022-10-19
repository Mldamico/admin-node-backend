import { Category } from "../models/Category.js";
import asyncHandler from 'express-async-handler';
import { Operation } from "../models/Operation.js";


export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll({
    where: {
      active: true
    }
  })
  res.json(categories)
})



export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  console.log(req.body)
  if (!name) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  if (name.length < 3) {
    return res.status(400).json({ message: "Name should be longer than 3 characters" })
  }

  const category = {
    name
  }

  const newCategory = await Category.create(category)
  res.json(newCategory)

})

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.body

  const foundCategory = await Category.findByPk(id)

  console.log(foundCategory)
  if (!foundCategory) {
    return res.status(401).json({ message: "Couldn't find any category" })
  }

  await foundCategory.update({ active: false }, {
    where: { id }
  })

  const operation = await Operation.update({ active: false }, {
    where: {
      categoryId: id
    }
  })
  console.log(operation)

  res.json({ foundCategory })
})

