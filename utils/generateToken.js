import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  const daysToMilliseconds = days => days * 24 * 60 * 60 * 1000
  const payload = { userId }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: daysToMilliseconds(7)
  })
}

export default generateToken
