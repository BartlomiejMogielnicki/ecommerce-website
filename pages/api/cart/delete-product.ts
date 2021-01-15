import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { connectToDB } from 'db/connect'

export default async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()
  const { title } = req.body

  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await db.collection('users').findOne({
      username: decoded._id,
      'tokens.token': token,
    })

    await db
      .collection('users')
      .updateOne({ username: decoded._id, 'tokens.token': token }, { $pull: { cart: { title } } })

    if (!user) {
      throw new Error()
    } else {
      res.status(200).send({})
    }
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}
