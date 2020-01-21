'use strict';


const express = require('express');
const app = express();
const server = require('http').Server(app)
const bodyParser = require('body-parser');
const request = require('request');
const io = require('socket.io')(server)
const access_token = "EAAjISRRWe2UBAEegIbFw8iiU22hiFu7HtAMn32sOTy89pWzxLYJbMyQ5MJFVYr5TUjBF1Q0R1mOm9AqgyVbXNZAlV5LmAum1ZBAAz0UlcHFKZBsBKPSWZBMpN9BomM7LBeQ272byo5WuUIZAqZChXTietQfQ5RffgKTPG2FcXjkjNzvl9647R6MUwHIJEvBNoZD"

const PORT = process.env.PORT || 3000


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send(`Hola mundo!!`)
})

const messages = [{
    author: "Carlos",
    text: "Hola, que tal?",
    id: 1
}, {
    author: "Pepe",
    text: "Muy bien! y tu?"
}, {
    author: "Paco",
    text: "Genial!"
}]

io.on('connection', function (socket) {
    console.log(`Cliente conectado`)
    socket.emit('messages', messages)

    socket.on('new-message', (data) => {
        console.log(`Se metio!!!`)
        messages.push(data)

        io.sockets.emit('messages', messages)
    })
})

// app.get('/webhook', function(req, res){
//     if(req.query['hub.verify_token'] === 'pugpizza_token'){
//         res.send(req.query['hub.challenge']);
//     } else {
//         res.send('PlatziPrueba no tienes permisos.');
//     }
// });

// app.post('/webhook/', function(req, res){
//     const webhook_event = req.body.entry[0];
//     if(webhook_event.messaging) {
//         webhook_event.messaging.forEach(event => {
//             handleEvent(event.sender.id, event);
//         });
//     }
//     res.sendStatus(200);
// });

// function handleEvent(senderId, event){
//     if(event.message){
//         handleMessage(senderId, event.message)
//     } else if(event.postback) {
//         handlePostback(senderId, event.postback.payload)
//     }
// }

// function handleMessage(senderId, event){
//     if(event.text){
//         defaultMessage(senderId);
//     } else if (event.attachments) {
//         handleAttachments(senderId, event)
//     }
// }

// function defaultMessage(senderId) {
//     const messageData = {
//         "recipient": {
//             "id": senderId
//         },
//         "message": {
//             "text": "Hola soy un bot de messenger y te invito a utilizar nuestro menu",
//             "quick_replies": [
//                 {
//                     "content_type": "text",
//                     "title": "Menu",
//                     "payload": "Menu"
//                 },
//                 {
//                     "content_type": "text",
//                     "title": "Acerca de",
//                     "payload": "ABOUT_PAYLOAD"
//                 }
//             ]
//         }
//     }
//     senderActions(senderId)
//     callSendApi(messageData);
// }

// function handlePostback(senderId, payload){
//     switch (payload) {
//         case "GET_STARTED_PUGPIZZA":
//             console.log(payload)
//         break;
//     }
// }

// function senderActions(senderId) {
//     const messageData = {
//         "recipient": {
//             "id": senderId
//         },
//         "sender_action": "typing_on"
//     }
//     callSendApi(messageData);
// }

// function handleAttachments(senderId, event){
//     let attachment_type = event.attachments[0].type;
//     switch (attachment_type) {
//         case "image":
//             console.log(attachment_type);
//         break;
//         case "video": 
//             console.log(attachment_type);
//         break;
//         case "audio":
//             console.log(attachment_type);
//         break;
//       case "file":
//             console.log(attachment_type);
//         break;
//       default:
//             console.log(attachment_type);
//         break;
//     }
// }

// function callSendApi(response) {
//     request({
//         "uri": "https://graph.facebook.com/me/messages",
//         "qs": {
//             "access_token": access_token
//         },
//         "method": "POST",
//         "json": response
//     },
//         function (err) {
//             if (err) {
//                 console.log('Ha ocurrido un error')
//             } else {
//                 console.log('Mensaje enviado')
//             }
//         }
//     )
// }

app.listen(PORT, function () {
    console.log(`Listen on:${PORT}`);
});
