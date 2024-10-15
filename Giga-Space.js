document.getElementById('sendBtn').addEventListener('click', processInput);
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') processInput();
});

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function processInput() {
    const input = document.getElementById('userInput');
    const userMessage = input.value.trim();

    if (userMessage) {
        displayMessage("You: " + userMessage);
        handleUserMessage(userMessage.toLowerCase());
        input.value = '';
    }
}

function handleUserMessage(message) {
    if (message.includes("add")) {
        const task = message.replace("add", "").trim();
        if (task) {
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayMessage("Bot: Task added - " + task, "feedback");
        } else {
            displayMessage("Bot: Please specify a task to add.", "error");
        }
    } else if (message.includes("show tasks")) {
        showTasks();
    } else if (message.includes("clear tasks")) {
        clearTasks();
    } else if (message.includes("clear chat history")) {
        clearChat();
    } else if (message === "founder") {
        displayMessage("Bot: The founder of Giga-Space is Anindya Maity.", "feedback");
    } else {
        displayMessage("Bot: I didn't understand. You can add tasks, show tasks, clear tasks, clear chat history, or ask for the founder.", "error");
    }
}

function showTasks() {
    if (tasks.length === 0) {
        displayMessage("Bot: No tasks in your to-do list.", "error");
    } else {
        tasks.forEach((task, index) => {
            displayMessage(`Bot: ${index + 1}. ${task}`);
        });
    }
}

function clearTasks() {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayMessage("Bot: All tasks cleared.", "feedback");
}

function clearChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // Clear all messages in the chat box
    displayMessage("Bot: Chat history cleared.", "feedback");
}

function displayMessage(message, type = "default") {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    if (type === "feedback") messageDiv.classList.add('feedback');
    if (type === "error") messageDiv.classList.add('error');
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to the latest message
}

// Initial welcome message
displayMessage("Bot: Hello! I'm Giga-space. You can show tasks, clear tasks, clear chat history.");
