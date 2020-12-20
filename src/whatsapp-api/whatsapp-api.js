const axios = require('axios')
const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const whatsapp = new Client({
  puppeteer: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
}})

whatsapp.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

whatsapp.on('ready', async () => {
    console.log('WhatsApp API Pronto!');
});

whatsapp.on('message', async msg => {
	if(msg.body === '!ping') {
        // client.sendMessage(message.from, 'pong');
        
        var audio = fs.readFileSync("audio.mp3", {
            encoding: "base64",
        });
        var media = new MessageMedia("audio/mpeg", audio);
        msg.reply(media, null, { sendAudioAsVoice: true });

        console.log(msg.from);
    }

    // Prepara a mensagem que será enviada para o Webhook
    // São enviados os seguintes campos conforme documentação da API (https://zenvia.github.io/zenvia-openapi-spec/v2/#section/MESSAGE)
    const msgWebhook = {
        id: '',
        timestamp: msg.timestamp,
        type: "MESSAGE",
        subscriptionId: '',
        direction: 'IN',
        channel: 'WhatsApp',
        message: {
          id: msg.id,
          from: msg.from.slice(2).replace('@c.us', ''), // Elimina o código do pais no início e dados referente ao envio pelo Wpp no final do número. 
          to: msg.to.slice(2).replace('@c.us', ''),     // Exemplo: 5531978546689@c.us passa para 31978546689 
          direction: 'IN',
          channel: 'WhatsApp',
          contents: [
            {
              type: msg.hasMedia ? 'file' : 'text',
              text: msg.body,
              payload: ''
            }
          ],
          visitor: {
            name: '',
            firstName: '',
            lastName: ''
          }
        }
    }

   // Envia a mensagem para o Webhook no backend da aplicação
   axios.post('http://localhost:3000/whatsapp/messages/webhook', msgWebhook)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
});

whatsapp.initialize();

module.exports = whatsapp