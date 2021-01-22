import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'
import auth from 'middleware/auth'

const changeQuantity = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDB()
  const { title, operation, username, token } = req.body

  try {
    let user = await db.collection('users').findOne({
      username,
      'tokens.token': token,
    })

    let modifiedCart
    if (operation === 'inc') {
      modifiedCart = user.cart.map((item) => {
        if (item.title === title) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item
      })
    }

    if (operation === 'dec') {
      modifiedCart = user.cart.map((item) => {
        if (item.title === title && item.quantity > 0) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }
        return item
      })
    }

    user = await db
      .collection('users')
      .findOneAndReplace({ username, 'tokens.token': token }, { ...user, cart: modifiedCart })

    if (!user) {
      throw new Error()
    } else {
      res.status(200).send({ cart: modifiedCart })
    }
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' })
  }
}

export default auth(changeQuantity)
