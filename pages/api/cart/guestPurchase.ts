import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDB } from 'db/connect'

const guestPurchase = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDB()
  const { cart, userData } = req.body

  const orderDate = new Date().toLocaleString('en-GB')
  const orderStatus = 'In progress'

  const newOrder = {
    orderDate,
    orderStatus,
    cart,
    userData,
  }

  try {
    await db.collection('orders').insertOne(newOrder)

    res.status(200).send({})
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' })
  }
}

export default guestPurchase
