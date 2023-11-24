import { FlBr, FrBl } from './input.js';

var closed = true;

function Joystick() {
  const retry = setInterval(() => {
    if(closed) {
      const ws = new WebSocket('ws://raspberrypi.local:2604');
  
      ws.addEventListener('open', (event) => {
        //console.log('Connected to WebSocket server');
        closed = false;
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
            //console.log('WebSocket is not in OPEN state. Closing interval.');
            closed = true;
            Joystick();
            clearInterval(intervalId);
          }
        }, 0); // Adjust the interval as needed
      });
      
      ws.addEventListener('message', (event) => {
        console.log(`Received message: ${event.data}`);
      });
      
      ws.addEventListener('close', (event) => {
        //console.log('Connection closed');
        document.getElementById("ConnectionState").innerHTML = "Failed to connect"
        closed = true;
      });
      
      ws.addEventListener('error', (event) => {
        //console.error('WebSocket encountered an error:', event);
        document.getElementById("ConnectionState").innerHTML = "WebSocket error occurred"
        closed = true;
      });
  
    } else {
      clearInterval(retry);
    }
  }, 2000);
}
Joystick();
