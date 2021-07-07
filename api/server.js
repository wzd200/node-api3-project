const express = require('express')

const usersRouter = require('./users/users-router')

const {
  logger,
  notFound,
  errorHandling
} = require('./middleware/middleware')

const server = express()

server.use(express.json())

server.use('/api/users', logger, usersRouter)

server.use('*', notFound)

server.use(errorHandling)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

module.exports = server
