import { FlBr, FrBl } from './input.js';

const ws = new WebSocket('ws://raspberrypi.local:2604');

ws.addEventListener('open', (event) => {
  console.log('Connected to WebSocket server');
  document.getElementById("ConnectionState").innerHTML = "Successfully connected"

  // Sending JSON data at regular intervals
  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const jsonData = {
        "FlBr": FlBr,
        "FrBl": FrBl,
      };

      ws.send(JSON.stringify(jsonData));
    } else {
      console.log('WebSocket is not in OPEN state. Closing interval.');
      clearInterval(intervalId);
    }
  }, 0); // Adjust the interval as needed
});

ws.addEventListener('message', (event) => {
  console.log(`Received message: ${event.data}`);
});

ws.addEventListener('close', (event) => {
  console.log('Connection closed');
  document.getElementById("ConnectionState").innerHTML = "Connection closed"
});

ws.addEventListener('error', (event) => {
  console.error('WebSocket encountered an error:', event);
  document.getElementById("ConnectionState").innerHTML = "WebSocket error occurred"
});

