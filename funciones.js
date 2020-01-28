function eventoFacebook(event){
    var result = []
    event.forEach(a => {
        const senderId = a.sender.id
        const mensaje = a.message.text
        const evento = {
            "senderId": senderId,
            "mensaje" : mensaje
        }
        result.push(evento)
    })
    return result
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