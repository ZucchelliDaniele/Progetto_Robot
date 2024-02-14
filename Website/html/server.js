"use strict";
import { Fl, Fr, Bl, Br } from './input.js';

var closed = true;
function getUrlWithNoPort() {
  const url = window.location.href;

  const parsedUrl = new URL(url);
  const baseUrl = `${parsedUrl.hostname}`;
  return baseUrl;
}

function server() {
  const retry = setInterval(() => {
    if(closed) {
      const ws = new WebSocket('ws://'+getUrlWithNoPort()+':2604');
  
      ws.addEventListener('open', (event) => {
        //console.log('Connected to WebSocket server');
        closed = false;
        // document.getElementById("ConnectionState").innerHTML = "Successfully connected"
      
        // Sending JSON data at regular intervals
        const wheelInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            const jsonData = {
              "Fl": Fl,
              "Fr": Fr,
              "Bl": Bl,
              "Br": Br
            };
      
            ws.send(JSON.stringify(jsonData));
          } else {
            //console.log('WebSocket is not in OPEN state. Closing interval.');
            closed = true;
            server();
            clearInterval(wheelInterval);
          }
        }, 100); // Adjust the interval as needed
      });
      
      ws.addEventListener('message', (event) => {
        console.log(`Received message: ${event.data}`);
      });
      
      ws.addEventListener('close', (event) => {
        //console.log('Connection closed');
        // document.getElementById("ConnectionState").innerHTML = "Failed to connect"
        closed = true;
      });
      
      ws.addEventListener('error', (event) => {
        //console.error('WebSocket encountered an error:', event);
        // document.getElementById("ConnectionState").innerHTML = "WebSocket error occurred"
        closed = true;
      });
  
    } else {
      clearInterval(retry);
    }
  }, 2000);
}
server();