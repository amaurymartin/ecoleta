
const express = require('express')

const routes = express.Router()

routes.get('/healthcheck', (_req, res) => {
  res.status(204).send()
})

module.exports = routes
