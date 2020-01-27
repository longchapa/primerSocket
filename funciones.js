function eventoFacebook(event){
    event.forEach(a => {
        const senderId = a.sender.id
        const mensaje = a.message.text
        const data = {
            "senderID": senderId,
            "mensaje" : mensaje
        }
        return data
    })
    
}

function messageData(senderId){
    const data = {
        "recipient": {
            "id": senderId
        },
        "message": {
            "text": "Esta es una prueba muy importante"
        }
    }
    return data
}

module.exports.messageData = messageData
module.exports.eventoFacebook = eventoFacebook