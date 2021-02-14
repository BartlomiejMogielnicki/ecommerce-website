import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { connectToDB } from 'db/connect'

export default async function cookieLogin(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()

  const cookies = cookie.parse(req.headers.cookie || '')
  const { auth } = cookies

  if (!auth) {
    res.end()
  } else {
    const username = jwt.verify(auth, process.env.JWT_SECRET)
    try {
      const user = await db.collection('users').findOne({ username: username._id })
      if (user) {
        res.status(200).send({
          user: {
            username: user.username,
            cart: user.cart,
            history: user.history,
            userData: user.userData,
          },
        })
      } else {
        res.status(404).send({})
      }
    } catch (error) {
      res.status(400).send({})
    }
  }
}
