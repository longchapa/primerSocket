const express = require('express')
const expressdevice = require('express-device')
const app = express()

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
    if(webhook_event.messaging){
        webhook_event.messaging.forEach(event =>{
            handleMessage(event)
            console.log(event)
        })
    }

    res.sendStatus(200)
})

function handleMessage(event){
    const senderId = event.sender.senderId
    const messageText = event.message.text
    const messageData = {
        recipient: {
            id: senderId
        },
        message: {
            text: messageText
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

