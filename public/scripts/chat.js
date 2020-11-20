const renderMessage = ({ type, name, message }) => {
    const chat = document.querySelector('div.messages');

    const messageContainerDiv = document.createElement(`div`);
    messageContainerDiv.classList.add('message');
    messageContainerDiv.classList.add(type);
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('time');

    nameDiv.innerText = name;
    messageDiv.innerText = message;
    timeDiv.innerText = `${('0'+new Date().getHours()).slice(-2)}:${('0'+new Date().getMinutes()).slice(-2)}`;

    messageContainerDiv.appendChild(nameDiv);
    messageContainerDiv.appendChild(messageDiv);
    messageContainerDiv.appendChild(timeDiv);

    chat.appendChild(messageContainerDiv);

    scrollEnd(messageContainerDiv);
}

const scrollEnd = (messageDiv) => {
    const chat = document.querySelector('div.messages');

    const chatBoxes = document.querySelectorAll('div.message');

    const scrolled = chat.offsetHeight + chat.scrollTop + messageDiv.offsetHeight + ( (chatBoxes.length * 14) || 0);

    if(scrolled >= chat.scrollHeight) {
        chat.scrollTo({
            top: chat.scrollHeight,
            left: 0,
            behavior: "smooth"
        });
    }
}

const renderUser = (user) => {
    if(user) {
        const connected = document.querySelector('div.connected-users');

        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        userDiv.dataset.hash = user.hash;
        userDiv.innerText = `${user.name}${user.hash == me.hash ? ' (Você)' : ''}`;

        connected.appendChild(userDiv);
    }
}

const removeUser = (user) => {
    if(user) {
        const connected = document.querySelector('div.connected-users');
        const users = connected.querySelectorAll('div.user');

        const divs = Array.from(users).filter(item => item.dataset.hash == user.hash);
        
        for(div of divs) connected.removeChild(div);
    }
}

const sendMessage = (event) => {
    event.preventDefault();

    const form = event.target;
    
    const input = form.querySelector('input');
    
    const message = input.value;
    input.value = "";

    if(message) {
        renderMessage({ type: 'sent', name: 'Você', message: message });
        emitMessage(message);
    }
}