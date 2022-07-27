const socket = io('http://localhost:8000')
const form = document.querySelector('#formContainer')
const msgInput = document.querySelector('#inputText')
const msgContainer = document.querySelector('.chatArea')

//msg- message content, position->reciever,sender

const mesgs = document.getElementsByClassName('chatArea')[0];
shouldScroll = mesgs.scrollTop + mesgs.clientHeight === mesgs.scrollHeight;
if (!shouldScroll) {
    scrollToBottom();
}
function scrollToBottom() {
    mesgs.scrollTop = mesgs.scrollHeight;
}

const appendUser = (msg) => {
    const userElement = document.createElement('div')
    userElement.innerHTML = msg;
    userElement.classList.add('newUserJoin')
    msgContainer.append(userElement)
    scrollToBottom();
}
const append = (msg, position) => {
    const msgElement = document.createElement('div')
    msgElement.innerHTML = msg;
    msgElement.classList.add('message')
    msgElement.classList.add(position)
    msgContainer.append(msgElement);
    scrollToBottom();
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`<p>${message}</p>`, 'sent');
    socket.emit('send', message);
    msgInput.value = "";
    scrollToBottom();
})

const name = prompt("Enter your name")

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    appendUser(`${name} joined the chat`);
})

socket.on('left', name => {
    appendUser(`${name} left the chat`);
})

socket.on('recieve', data => {
    append(`<span>${data.name}</span> <p> ${data.message}</p>`, 'recieved');
})