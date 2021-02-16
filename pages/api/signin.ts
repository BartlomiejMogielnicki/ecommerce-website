import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()

  const { username, email, password } = req.body

  try {
    const nameCheck = await db.collection('users').findOne({ username })
    const emailCheck = await db.collection('users').findOne({ email })

    if (nameCheck || emailCheck) {
      res.status(406).send({})
    }

    const cryptedPassword = await bcrypt.hash(password, 8)

    const user = {
      username,
      cryptedPassword,
      cart: [],
      history: [],
      userData: {
        firstName: '',
        lastName: '',
        email,
        phone: '',
        country: '',
        voivodeship: '',
        city: '',
        zipCode: '',
        street: '',
        building: '',
      },
      tokens: [],
    }

    const token = jwt.sign({ _id: username }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })

    await db.collection('users').insertOne(user)

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600 * 12,
        path: '/',
      }),
    )

    res.status(201).send({
      user: {
        username: user.username,
        cart: user.cart,
        history: user.history,
        userData: user.userData,
      },
    })
  } catch (error) {
    res.status(500).send({})
  }
}
