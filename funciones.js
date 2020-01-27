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

module.exports = funciones