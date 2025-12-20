document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Basic responses database
    const botResponses = {
        'hello': ['Hi there! How can I help you today?', 'Hello! Welcome back.', 'Greetings!'],
        'hi': ['Hi there! How can I help you today?', 'Hello! Welcome back.', 'Greetings!'],
        'how are you': ['I am just a bot, but I am functioning perfectly! How about you?', 'I\'m doing great, thanks for asking!'],
        'help': ['I can help you with basic questions. Just ask me anything!', 'Sure, what do you need assistance with?'],
        'what is your name': ['I am a simple chatbot created to assist you.', 'You can call me Bot.'],
        'bye': ['Goodbye! Have a great day!', 'See you soon!', 'Bye bye!'],
        'default': ['I\'m not sure I understand that. Could you rephrase?', 'That\'s interesting! Tell me more.', 'I am still learning, so I might not know everything yet.']
    };

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'typing-indicator';
        indicatorDiv.id = 'typingIndicator';
        indicatorDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(indicatorDiv);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userText) {
        const cleanText = userText.toLowerCase().trim();
        
        // Check for matches
        for (const key in botResponses) {
            if (cleanText.includes(key) && key !== 'default') {
                const responses = botResponses[key];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        // Default response
        const defaults = botResponses['default'];
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    function handleSend() {
        const text = userInput.value.trim();
        if (text === '') return;

        // Add user message
        addMessage(text, true);
        userInput.value = '';

        // Simulate bot thinking
        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            const response = getBotResponse(text);
            addMessage(response);
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    // Event listeners
    sendBtn.addEventListener('click', handleSend);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // Initial greeting
    setTimeout(() => {
        // addMessage("Hello! I'm online and ready to chat.", false);
    }, 500);
});
