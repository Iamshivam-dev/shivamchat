const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".chats");

var intro = new Audio('IPL.mp3');
var ring = new Audio('ring.mp3')
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}

const name = prompt("Please enter your name" );
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'left');
    intro.play();
    
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
    ring.play()
})


socket.on('left', name =>{
    append(`${name}: Left the chat`, 'left');
 

})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value=""; 
})