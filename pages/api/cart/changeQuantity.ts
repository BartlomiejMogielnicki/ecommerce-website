import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { connectToDB } from 'db/connect'

export default async function changeQuantity(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDB()
  const { title, action } = req.body

  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    let user = await db.collection('users').findOne({
      username: decoded._id,
      'tokens.token': token,
    })

    let modifiedCart
    if (action === 'inc') {
      modifiedCart = user.cart.map((item) => {
        if (item.title === title) {
          return item.quantity + 1
        }
        return item
      })
    }

    if (action === 'dec') {
      modifiedCart = user.cart.map((item) => {
        if (item.title === title && item.quantity > 0) {
          return item.quantity - 1
        }
        return item
      })
    }

    user = await db
      .collection('users')
      .findOneAndReplace({ username: decoded._id, 'tokens.token': token }, { ...user, cart: modifiedCart })

    if (!user) {
      throw new Error()
    } else {
      res.status(200).send({ user })
    }
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}
