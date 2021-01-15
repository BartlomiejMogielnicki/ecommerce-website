import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { connectToDB } from 'db/connect'

export default async function changeQuantity(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()
  const { product } = req.body

  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await db.collection('users').findOne({
      username: decoded._id,
      'tokens.token': token,
    })

    const updatedUser = await db
      .collection('users')
      .findOneAndUpdate(
        { username: decoded._id, 'tokens.token': token },
        { $push: { cart: { ...product } } },
        { returnOriginal: false },
      )

    if (!user) {
      throw new Error()
    } else {
      res.status(200).send({ cart: updatedUser.value.cart })
    }
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}
