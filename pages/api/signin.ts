import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()

  const { username, email, password } = req.body

  try {
    const nameCheck = await db.collection('users').findOne({ username })
    const emailCheck = await db.collection('users').findOne({ email })

    if (nameCheck || emailCheck) {
      res.status(406).send({})
    }

    const user = {
      username,
      email,
      password,
    }
    await db.collection('users').insertOne(user)

    res.status(201).send(user)
  } catch (error) {
    res.status(400).send({})
  }
}
