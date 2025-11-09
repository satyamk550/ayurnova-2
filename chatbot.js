// scripts/chatbot.js

document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chatbot-button');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const typingIndicator = document.getElementById('typing-indicator');

    const STORAGE_KEY = 'chatMessages';

    // --- Chatbot Data ---
    const responses = {
        'panchakarma': {
            response: 'Panchakarma is an Ayurvedic detoxification and rejuvenation program. It involves five primary therapeutic procedures: Vamana (emesis), Virechana (purgation), Basti (enema), Nasya (nasal administration), and Raktamokshana (bloodletting).',
            keywords: ['what is panchakarma', 'panchakarma', 'five therapies', 'detox']
        },
        'book treatment': {
            response: 'To book a treatment, please log in to your account. As a **Patient**, you will find the **"Book Treatments"** card directly on your dashboard. Follow the steps there to schedule.',
            keywords: ['how to book', 'book a treatment', 'scheduling', 'appointment']
        },
        'nabh certified': {
            response: 'Yes, AyurNova is designed to be **NABH Certified** and compliant with all quality standards for Ayurvedic clinics. This ensures high-quality clinical and data management.',
            keywords: ['is ayurnova nabh certified', 'nabh', 'compliance', 'abdm']
        },
        'doctors use': {
            response: 'Doctors on AyurNova can manage **Patient Records (EMR)**, view **Appointments**, track **Treatments/Therapies**, and monitor **Inventory** for better resource management.',
            keywords: ['how do doctors use ayurnova', 'doctor features', 'doctor dashboard', 'emr']
        },
        'health records': {
            response: 'Your health records are accessible via the **Patient Dashboard** under the **"My Health Records"** section. You can view your EMR, prescriptions, and past treatment history securely.',
            keywords: ['how to access health records', 'emr', 'records', 'prescriptions']
        },
        'hello': {
            response: '👋 Welcome to AyurNova! I can help you understand **Panchakarma**, **booking**, **NABH/ABDM** compliance, or navigating dashboards.',
            keywords: ['hi', 'hello', 'greetings']
        }
    };

    // --- Message Persistence ---

    function loadMessages() {
        const storedMessages = sessionStorage.getItem(STORAGE_KEY);
        if (storedMessages) {
            JSON.parse(storedMessages).forEach(msg => {
                displayMessage(msg.text, msg.sender, false); // Don't save again
            });
        }
    }

    function saveMessage(text, sender) {
        const message = { text, sender, timestamp: new Date().toISOString() };
        let storedMessages = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
        storedMessages.push(message);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storedMessages));
    }

    // --- UI Functions ---

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displayMessage(text, sender, save = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'flex justify-end' : 'flex justify-start';
        messageDiv.innerHTML = `
            <div class="${sender === 'user' ? 'bg-[#2e7d32] text-white rounded-xl rounded-br-sm' : 'bg-gray-200 text-gray-800 rounded-xl rounded-tl-sm'} p-3 max-w-xs shadow-md">
                ${text}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        if (save) {
            saveMessage(text, sender);
        }
        scrollToBottom();
    }

    function toggleChatWindow() {
        const isHidden = chatWindow.classList.contains('hidden');
        if (isHidden) {
            chatWindow.classList.remove('hidden', 'scale-95', 'opacity-0');
            chatWindow.classList.add('scale-100', 'opacity-100');
            // Check if chat messages exist, if not, display the initial welcome message
            if (sessionStorage.getItem(STORAGE_KEY) === null || JSON.parse(sessionStorage.getItem(STORAGE_KEY)).length === 0) {
                 displayMessage(responses.hello.response, 'bot', true); 
            }
        } else {
            chatWindow.classList.remove('scale-100', 'opacity-100');
            chatWindow.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                chatWindow.classList.add('hidden');
            }, 300); // Wait for transition
        }
        chatInput.focus();
    }

    // --- Chatbot Response Logic ---

    function getBotResponse(userText) {
        const lowerCaseText = userText.toLowerCase();

        for (const key in responses) {
            const data = responses[key];
            const match = data.keywords.some(keyword => lowerCaseText.includes(keyword));
            if (match) {
                return data.response;
            }
        }
        
        return 'I apologize, I can only provide static information regarding Panchakarma, booking, NABH/ABDM compliance, or dashboard navigation. Please try rephrasing your question.';
    }

    function processUserInput() {
        const userText = chatInput.value.trim();
        if (!userText) return;

        displayMessage(userText, 'user');
        chatInput.value = ''; // Clear input

        typingIndicator.classList.remove('hidden');
        chatInput.disabled = true;

        // Simulate typing delay
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
            chatInput.disabled = false;
            
            const botResponse = getBotResponse(userText);
            displayMessage(botResponse, 'bot');
            chatInput.focus();
        }, Math.random() * 1000 + 500); // 0.5s to 1.5s delay
    }

    // --- Event Listeners ---
    if (chatButton && chatWindow) {
        chatButton.addEventListener('click', toggleChatWindow);
        chatClose.addEventListener('click', toggleChatWindow);
        chatSend.addEventListener('click', processUserInput);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processUserInput();
            }
        });
    }

    // Initial load of messages
    loadMessages();
});