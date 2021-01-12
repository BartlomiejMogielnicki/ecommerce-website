import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()

  if (req.method === 'POST') {
    try {
      const { username, password } = req.body

      const user = await db.collection('users').findOne({ username, password })
      res.send({ user })
    } catch (error) {
      res.status(400).send({})
    }
  }
}
