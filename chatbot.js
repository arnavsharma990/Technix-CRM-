document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const chatHeader = document.getElementById('chatHeader');
    const toggleChat = document.getElementById('toggleChat');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const chatInput = document.getElementById('chatInput');
    
    // Initial welcome message
    setTimeout(() => {
        addBotMessage("Hello! I'm your T-CRM assistant. How can I help you automate tasks and boost your team's performance today?");
    
        // Add quick replies
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'quick-replies';
        
        const quickReplies = [
            "How can T-CRM help my sales team?", 
            "What tasks can be automated?",
            "Tell me about pricing"
        ];
        
        quickReplies.forEach(reply => {
            const quickReply = document.createElement('div');
            quickReply.className = 'quick-reply';
            quickReply.textContent = reply;
            quickReply.addEventListener('click', () => {
                handleUserMessage(reply);
            });
            quickRepliesDiv.appendChild(quickReply);
        });
        
        chatMessages.appendChild(quickRepliesDiv);
    }, 500);
    
        // Toggle chat
    toggleChat.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling to header
        chatContainer.classList.toggle('collapsed');
        if(!chatContainer.classList.contains('collapsed')) {
            toggleChat.textContent = '−';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            toggleChat.textContent = '+';
        }
    });
    
    // Allow clicking the entire header to toggle when collapsed
    chatHeader.addEventListener('click', function() {
        if(chatContainer.classList.contains('collapsed')) {
            chatContainer.classList.remove('collapsed');
            toggleChat.textContent = '−';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
    
    // Send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            handleUserMessage(message);
            userInput.value = '';
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function handleUserMessage(message) {
        // Add user message
        addUserMessage(message);
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process the message and respond
        setTimeout(() => {
            hideTypingIndicator();
            respondToUser(message);
        }, 1000 + Math.random() * 1000); // Random delay to make it feel more natural
    }
    
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    function respondToUser(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple response logic
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            addBotMessage("Hello! How can I help you with T-CRM today?");
        }
        else if (lowerMessage.includes('sales team') || lowerMessage.includes('help my sales')) {
            addBotMessage("T-CRM helps your sales team by automating lead tracking, follow-ups, and providing real-time analytics. Your team can focus on closing deals while T-CRM handles repetitive tasks and provides insights for better decision-making.");
        }
        else if (lowerMessage.includes('tasks') || lowerMessage.includes('automate')) {
            addBotMessage("T-CRM can automate email campaigns, lead scoring, follow-up reminders, data entry, report generation, and customer onboarding workflows. This saves your team hours every week and ensures consistent customer experiences.");
        }
        else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            addBotMessage("Our pricing is tailored to your business needs. We offer flexible plans starting from $29/month per user. Would you like to schedule a call with our team for a personalized quote?");
            
            // Add quick replies
            const quickRepliesDiv = document.createElement('div');
            quickRepliesDiv.className = 'quick-replies';
            
            const quickReplies = ["Yes, schedule a call", "Tell me more features"];
            
            quickReplies.forEach(reply => {
                const quickReply = document.createElement('div');
                quickReply.className = 'quick-reply';
                quickReply.textContent = reply;
                quickReply.addEventListener('click', () => {
                    handleUserMessage(reply);
                });
                quickRepliesDiv.appendChild(quickReply);
            });
            
            chatMessages.appendChild(quickRepliesDiv);
        }
        else if (lowerMessage.includes('schedule a call') || lowerMessage.includes('talk to sales')) {
            addBotMessage("Great! Please share your email address and preferred time, and our team will reach out to schedule a personalized demo.");
        }
        else if (lowerMessage.includes('features') || lowerMessage.includes('more features')) {
            addBotMessage("T-CRM offers lead management, email automation, sales pipeline tracking, performance analytics, task management, customer segmentation, and integrated communication tools. What specific features are you most interested in?");
        }
        else if (lowerMessage.includes('thank')) {
            addBotMessage("You're welcome! Is there anything else I can help you with today?");
        }
        else {
            addBotMessage("I'd be happy to help with that. For more specific information about how T-CRM can streamline your workflow, would you like to speak with our team?");
            
            // Add quick replies
            const quickRepliesDiv = document.createElement('div');
            quickRepliesDiv.className = 'quick-replies';
            
            const quickReplies = ["Yes, contact sales", "Show me T-CRM features"];
            
            quickReplies.forEach(reply => {
                const quickReply = document.createElement('div');
                quickReply.className = 'quick-reply';
                quickReply.textContent = reply;
                quickReply.addEventListener('click', () => {
                    handleUserMessage(reply);
                });
                quickRepliesDiv.appendChild(quickReply);
            });
            
            chatMessages.appendChild(quickRepliesDiv);
        }
    }
});