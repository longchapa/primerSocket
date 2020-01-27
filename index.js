const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
const request = require('request')
const PORT = process.env.PORT || 3000

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
    console.log(webhook_event)
    if(webhook_event.messaging){
        webhook_event.messaging.forEach(event=>{
            // handleEvent(event.sender.id, event)
            console.log(event.text)
            io.emit('mensaje', event.text)
        })
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
    const messageData = {
        "recipient":{
            "id": senderId
        },
        "message":{
            "text": "Esta es una prueba muy importante"
        }
    }
    callSendApi(messageData)
}

function callSendApi(response){

    const access_token = "EAAjISRRWe2UBAEegIbFw8iiU22hiFu7HtAMn32sOTy89pWzxLYJbMyQ5MJFVYr5TUjBF1Q0R1mOm9AqgyVbXNZAlV5LmAum1ZBAAz0UlcHFKZBsBKPSWZBMpN9BomM7LBeQ272byo5WuUIZAqZChXTietQfQ5RffgKTPG2FcXjkjNzvl9647R6MUwHIJEvBNoZD"

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


