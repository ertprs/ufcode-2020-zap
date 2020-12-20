const express = require('express')
const ZenviaWhatsAppMessage = require('../models/zenvia')
const router = new express.Router()
const whatsapp = require('./../whatsapp-api/whatsapp-api')

// ** Simulação de interação com a API da empresa Zenvia (https://www.zenvia.com/produtos/whatsapp/) **

// Por meio desse simulador, conseguimos enviar mensagens para o WhatsApp do cliente e também receber
// as mensagens que ele enviar para a conversa. 

// O endpoint para simulação de envio de mensagens segue exatamente como na documentação da API da Zenvia:
// https://zenvia.github.io/zenvia-openapi-spec/v2/#section/WhatsApp-sender-and-recipient

// As mensagens recebidas (envidas pelo usuário) são repassadas para um Webhook, onde serão processadas e
// analisadas para criar um fluxo automatizado. O Webhook desse simulador também segue exatamente as
// especificações da API da Zenvia:
// https://zenvia.github.io/zenvia-openapi-spec/v2/#tag/Webhooks


// Envia uma mensagem para um usuário
//
// Body schema: application/json
// 
// {
//     "from": "string",
//     "to": "string",
//     "contents": [
//         {
//             "type": "text",
//             "text": "Mensagem de teste"
//         }
//     ]
// }
//
// Ref: https://zenvia.github.io/zenvia-openapi-spec/v2/#tag/WhatsApp/paths/~1channels~1whatsapp~1messages/post
//
router.post('/v2/channels/whatsapp/messages', async (req, res) => {
    try {
        // Informações da mensagem a ser envia (para quem, conteúdo, etc) 
        const msg = new ZenviaWhatsAppMessage(req.body)

        // Envia mensagem para o WhatsApp do cliente
        whatsapp.sendMessage('55' + msg.to + '@c.us', msg.contents[0].text);
    
        // Retorna como resposta de sucesso a própria informação da mensagem
        res.status(201).send(req.body)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router