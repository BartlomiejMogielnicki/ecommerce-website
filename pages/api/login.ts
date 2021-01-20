import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { compare } from 'bcrypt'
import { connectToDB } from 'db/connect'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()

  const { username, password } = req.body

  try {
    let user = await db.collection('users').findOne({ username })

    if (user) {
      await compare(password, user.cryptedPassword, (err, result) => {
        if (err || !result) {
          res.status(404).send({})
        }
      })

      const token = jwt.sign({ _id: username }, process.env.JWT_SECRET)
      const tokensArray = user.tokens.concat({ token })

      user = await db.collection('users').findOneAndReplace({ username }, { ...user, tokens: tokensArray })

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

      res.status(200).send({
        user: {
          username: user.value.username,
          cart: user.value.cart,
          history: user.value.history,
        },
      })
    } else {
      res.status(404).send({})
    }
  } catch (error) {
    res.status(400).send({})
  }
}
