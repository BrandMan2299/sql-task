const express = require('express')

const app = express()
app.use(express.json())


app.use('/api/', require('./api'))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

module.exports = app;