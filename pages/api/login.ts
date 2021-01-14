import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { connectToDB } from 'db/connect'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()

  const { username, password } = req.body

  try {
    let user = await db.collection('users').findOne({ username, password })

    if (user) {
      const token = jwt.sign({ _id: username }, process.env.JWT_SECRET)
      const tokensArray = user.tokens.concat({ token })

      user = await db.collection('users').findOneAndReplace({ username, password }, { ...user, tokens: tokensArray })
      res.status(200).send({ user: user.value, token })
    } else {
      res.status(404).send({})
    }
  } catch (error) {
    res.status(400).send({})
  }
}
