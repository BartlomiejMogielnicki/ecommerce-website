import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
      }),
    )
    res.status(200).send({})
  } catch (error) {
    res.status(500).send({})
  }
}
