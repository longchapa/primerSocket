const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const request = require('request')
const PORT = process.env.PORT || 3000
const funcion = require('./funciones')

io.on('connection', (socket)=>{
    console.log(`Cliente conectado${socket.id}`)
})

app.use(bodyParser.json())

app.get('/', (req,res)=>{
    res.status(200).send(`Hola mundo`)
})

app.get('/webhook', (req,res)=>{
    if(req.query['hub.verify_token'] === 'accesoAEsteWebhook'){
        res.send(req.query['hub.challenge'])
    }else{
        res.send(`No tiene permisos, pero funciona`)
    }
})

app.post('/webhook', (req, res)=>{
    const webhook_event = req.body.entry[0]
    if(webhook_event.messaging){
        console.log(`Detecta mensaje`)
        const data = funcion.eventoFacebook(webhook_event.messaging)
        // handleEvent(data.senderId, data)
        console.log(data)
        // io.emit('mensaje', data.mensaje)
        // webhook_event.messaging.forEach(event=>{
        //     handleEvent(event.sender.id, event)
        //     console.log(event.message.text)
        //     io.emit('mensaje', event.message.text)
        // })
        res.sendStatus(200)
    }else{
        res.sendStatus(400)
    }
})

function handleEvent(senderId, event){
    if(event.message){
        defaultMessage(senderId)
    }
}

function defaultMessage(senderId){
    const messageData = funcion.messageData(senderId)
    callSendApi(messageData)
}

function callSendApi(response){

    const access_token = "EAAjISRRWe2UBABbFjZAzU3HYt1VzXYXaHf0SgD6GZCyX2jNUf06RFlx4U8dwWLzJUnrXytzZAstLU5sHp1Y5st0AbEqmINWNTH5waFyFEc5SHdvA7iaPAzo6HonvFLTOpRCtv1eQOF8OhVslnccKjbQwKVZAuImJj9ax6veOboIX3d8QdX4ZBhZBZCUZC7D8rhkZD"

    request({
        "uri": "https://graph.facebook.com/me/messages",
        "qs": {
            "access_token": access_token
        },
        "method": "POST",
        "json": response
    },
        function (err) {
            if (err) {
                console.log('Ha ocurrido un error')
            } else {
                console.log(response.recipient.id)
            }
        }
    )
}

server.listen(PORT, ()=>{
    console.log(`Listen on http://localhost:${PORT}`)
})


