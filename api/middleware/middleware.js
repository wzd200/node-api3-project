const User = require('../users/users-model')

function logger(req, res, next) {
  console.log(`${req.method} request`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params
    console.log(`the id is ${id}`)
    const user = await User.getById(id)
    if (user) {
      req.hub = user
      next()
    } else {
      next({
        status: 404,
        message: `user not found`,
      })
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    next({
      status: 400,
      message: 'missing required name field'
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    next({
      status: 400,
      message: 'missing required text field'
    })
  } else {
    next()
  }
}

const notFound = (req, res, next) => {
  res.status(404).json({
    message: 'not found, sorry!'
  })
}

const errorHandling = (err, req, res, next) => { // eslint-disable-line
  const status = err.status || 500
  res.status(status).json({
    message: err.message,
  })
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  notFound,
  errorHandling
}
