import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const auth = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  jwt.verify(req.cookies.auth, process.env.JWT_SECRET, async (err, decoded) => {
    if (!err && decoded) {
      req.body.username = decoded._id
      req.body.token = req.cookies.auth
      return fn(req, res)
    }

    return res.status(401).send({ error: 'Please authenticate.' })
  })
}

export default auth
