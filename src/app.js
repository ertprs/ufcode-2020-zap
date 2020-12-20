const express = require('express')
require('./db/mongoose')

// Rotas de simulação do serviço Zenvia para envio de mensagem pelo WhatsApp
const zenvia = require('./routers/zenvia')

const app = express()

app.use(express.json())
app.use(zenvia)

module.exports = app