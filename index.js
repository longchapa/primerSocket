const express = require('express')
const expressdevice = require('express-device')
const app = express()
const access_token = "EAAjISRRWe2UBAOBUhG7cZC6QSWcGVfWyAQppFDikURJLxSxVNzPEWsRqLbhU6k98gFpYXdPYu7IFnl3LOLRJkdwMVMvCZB8E6ZC6EQeQUhjfMG45geuf30fY2EEesZBAfeFn0KZBzIuUQxSGdFFbFdvnXWFHOC9lr9RlTorkbhz9eI6MTeNkShAh9TzmdKj4ZD"

app.get('/', (req,res)=>{
    res.send('Este es el root y deberia funcionar')
})
app.listen(process.env.PORT || 3000, ()=>console.log('Activo en el puerto 3000'))


app.get('/webhook', (req,res)=>{
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']
    let VERIFY_TOKEN = "claveDeAcceso"

    if(token === VERIFY_TOKEN){
        res.send(challenge)
    }else{
        res.send('No se tienen los permisos')
    }
})

app.post('/webhook', (req,res)=>{
    const webhook_event = req.body.entry[0]
    console.log(webhook_event)
    if(webhook_event.messaging){
        webhook_event.messaging.forEach(event =>{
            handleEvent(event.sender.id, event)
        })
    }

    res.sendStatus(200)
})

function handleEvent(senderId, event){
    if(event.message){
        handleMessage(senderId, event.message)
    }
}

function handleMessage(event){
    if(event.text){
        defaultMessage(senderId)
    }
}

function defaultMessage(senderId){
    const messageData = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "Esta es una respuesta automatica"
        }
    }
    callSendApi(messageData)
}

function callSendApi(response){
    request({
        "uri":"https://graph.facebook.com/me/messages",
        "qs": {
            "access_token": access_token
        },
        "method": "POST",
        "json": response
    },
    function(err){
        if(err){
            console.log(`Ocurrio un error`)
        }else{
            console.log(`Mensaje enviado`)
        }
    }
    )
}

