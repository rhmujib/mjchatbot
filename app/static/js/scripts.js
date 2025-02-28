document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');
    const chatId = document.querySelector('.sidebar li.active').dataset.chatId;

    // Add user message to chat box
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Clear input field
    document.getElementById('user-input').value = '';

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message typing-indicator';
    typingIndicator.textContent = '...';
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send user input to server and get response
    fetch('/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_input=${encodeURIComponent(userInput)}&chat_id=${chatId}`,
    })
    .then(response => response.json())
    .then(data => {
        // Remove typing indicator
        typingIndicator.remove();

        // Add bot response to chat box
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.textContent = data.response;
        chatBox.appendChild(botMessage);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    });
});

document.getElementById('new-chat-button').addEventListener('click', function() {
    const chatName = document.getElementById('new-chat-name').value || `Chat ${document.querySelectorAll('.sidebar li').length + 1}`;
    fetch('/new_chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `chat_name=${encodeURIComponent(chatName)}`,
    })
    .then(response => response.json())
    .then(data => {
        addChatToList(data.chat_id, data.chat_name);
        loadChat(data.chat_id);
    });
});

document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#toggle-dark-mode i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Function to add a new chat to the chat list
function addChatToList(chatId, chatName) {
    const chatList = document.getElementById('chat-list');
    const chatItem = document.createElement('li');
    chatItem.dataset.chatId = chatId;

    const chatNameSpan = document.createElement('span');
    chatNameSpan.textContent = chatName;
    chatItem.appendChild(chatNameSpan);

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash delete-icon';
    deleteIcon.addEventListener('click', function(event) {
        event.stopPropagation();
        deleteChat(chatId, chatItem);
    });
    chatItem.appendChild(deleteIcon);

    chatItem.addEventListener('click', function() {
        // Load the selected chat
        loadChat(chatId);
        document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
        chatItem.classList.add('active');
    });

    chatList.appendChild(chatItem);
}

// Function to load a chat by its ID
function loadChat(chatId) {
    // Fetch the chat data from the server and display it in the chat box
    fetch(`/load_chat/${chatId}`)
    .then(response => response.json())
    .then(data => {
        const chatBox = document.getElementById('chat-box');
        chatBox.innerHTML = '';
        data.messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${message.sender}-message`;
            messageDiv.textContent = message.text;
            chatBox.appendChild(messageDiv);
        });
    });
}

// Function to delete a chat
function deleteChat(chatId, chatItem) {
    fetch(`/delete_chat/${chatId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Chat deleted.') {
            chatItem.remove();
            const chatBox = document.getElementById('chat-box');
            chatBox.innerHTML = '<div class="message bot-message">Hello! How can I assist you today? 😊</div>';
        }
    });
}

// Load existing chats from the server
function loadExistingChats() {
    fetch('/load_chats')
    .then(response => response.json())
    .then(data => {
        data.chats.forEach(chat => {
            addChatToList(chat.id, chat.name);
        });
    });
}

// Load existing chats on page load
loadExistingChats();