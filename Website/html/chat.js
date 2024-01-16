"use strict";
var user_id_number = 0;
var ai_id_number = 0;
function send_input(){
    var message = document.getElementById('ChatInput').value;
    document.getElementById('ChatInput').value = '';
    if(message != "") {
        const chat = document.getElementById('Chat');
        const div_index = document.createElement('div');
        const div_text = document.createElement('div');
        const span = document.createElement('span');
        const img = document.createElement('img');
        const h1 = document.createElement('h1');
        div_index.className = "dark:text-white mx-20 my-3 flex items-center";
        img.className = "h-8 inline-flex"
        if (document.documentElement.classList.contains('dark')) {
            img.src = "./images/user_white.png"
        } else {
            img.src = "./images/user_black.png"
        }
        img.id = "UserIcon: " + user_id_number;
        h1.className = "inline-flex text-2xl ml-2"
        h1.innerHTML = "User"
        div_index.appendChild(img);
        div_index.appendChild(h1);
        chat.appendChild(div_index);
        div_text.className = "dark:text-white mx-24 my-3 flex items-center";
        span.className = "block text-base text-gray-500 mx-7";
        span.innerHTML = message;
        div_text.appendChild(span);
        chat.appendChild(div_text);
        user_id_number++;
        scrollToBottom()
        receive_input();
    }
}

function receive_input(){
    const chat = document.getElementById('Chat');
    const div_index = document.createElement('div');
    const div_text = document.createElement('div');
    const span = document.createElement('span');
    const img = document.createElement('img');
    const h1 = document.createElement('h1');
    const loading = document.createElement('img');
    div_index.className = "dark:text-white mx-20 my-3 flex items-center";
    img.className = "h-8 inline-flex"
    if (document.documentElement.classList.contains('dark')) {
        img.src = "./images/ai_white.png"
    } else {
        img.src = "./images/ai_black.png"
    }
    img.id = "Ai: " + ai_id_number;
    h1.className = "inline-flex text-2xl ml-2"
    h1.innerHTML = "ChatGPT"
    div_index.appendChild(img);
    div_index.appendChild(h1);
    chat.appendChild(div_index);
    div_text.className = "dark:text-white mx-24 my-3 flex items-center";
    span.className = "block text-base text-gray-500 mx-7";
    sleep(3000).then(() => {
        span.innerHTML = Math.random();
        div_text.appendChild(span);
    });
    loading.src = "./images/loading.gif"
    loading.className = "h-8 block"
    span.appendChild(loading);
    div_text.appendChild(span);
    chat.appendChild(div_text);
    ai_id_number++;
    scrollToBottom()
}

function change_img_color() {
    for(var i=0; i<user_id_number; i++) {
        var img = document.getElementById("UserIcon: " + i)
        if (document.documentElement.classList.contains('dark')) {
            img.src = "./images/user_white.png"
        } else {
            img.src = "./images/user_black.png"
        }
    }
    for(var i=0; i<ai_id_number; i++) {
        var img = document.getElementById("Ai: " + i)
        if (document.documentElement.classList.contains('dark')) {
            img.src = "./images/ai_white.png"
        } else {
            img.src = "./images/ai_black.png"
        }
    }
}

function scrollToBottom() {
    const chatContainer = document.getElementById("Chat");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}