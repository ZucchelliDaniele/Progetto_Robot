"use strict"
export var hours
export var minutes
export var seconds

document.addEventListener("DOMContentLoaded", function () {
    updateClock()
});

function updateClock() {
    const now = new Date();
    hours = now.getHours().toString().padStart(2, '0');
    minutes = now.getMinutes().toString().padStart(2, '0');
    seconds = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('clock').innerText = hours + ':' + minutes;    
}

// Update the clock every minute
setInterval(updateClock, 1000);