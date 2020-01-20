const socket = io.connect('http://localhost:5000', { 'forceNew': true })

socket.on('messages', (data)=>{
    console.log(data)
    render(data)
})

function render(data){
    const html = data.map(function(elem, index){
        return(`
            <div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em>
            </div>
        `)
    }).join(" ")

    document.getElementById('messages').innerHTML = html
}

function addMessage(e){
    const message = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    }

    socket.emit('new-message', message)
    return false
}