function eventoFacebook(event){
    event.forEach(a => {
        const senderId = a.sender.id
        const mensaje = a.message.text
        const evento = {
            "senderId": senderId,
            "mensaje" : mensaje
        }
        return evento
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

module.exports = {
    eventoFacebook,
    messageData
}