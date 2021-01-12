import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()

  const { username, password } = req.body

  try {
    const user = await db.collection('users').findOne({ username, password })

    if (user) {
      res.status(200).send({ user })
    }
    res.status(404).send({})
  } catch (error) {
    res.status(400).send({})
  }
}
