import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
export async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ where: { username } })


    if (duplicate) {
      return res.status(409).json({ message: 'Duplicate username' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = { username, password: hashedPassword }


    const newUser = await User.create(user)

    const accessToken = jwt.sign(
      {
        userInfo: {
          username: username,
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '10d' }
    )

    const refreshToken = jwt.sign(
      { username: username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '15d' }
    )


    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })


    res.json({ accessToken })

  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  const foundUser = await User.findOne({ where: { username } })

  if (!foundUser) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const match = await bcrypt.compare(password, foundUser.password)

  if (!match) return res.status(401).json({ message: 'Unauthoriesd' })

  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10d' }
  )

  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '15d' }
  )


  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })


  res.json({ accessToken })
})

export const refresh = (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = cookies.jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' })

      const foundUser = await User.findOne({ where: { username: decoded.username } })

      if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

      const accessToken = jwt.sign(
        {
          "userInfo": {
            "username": foundUser.username,
            "roles": foundUser.roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15d' }
      )

      res.json({ accessToken })
    }
  )
}

export const logout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.json({ message: 'Cookie cleared' })
}