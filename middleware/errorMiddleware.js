export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(400)
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let msg = err.message
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    msg = `Resource not Found`
    statusCode = 404
  }
  res.status(statusCode).json({ errors: [{ msg, stack: err.stack }] })
}
