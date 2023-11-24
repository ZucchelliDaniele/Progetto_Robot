import asyncio
import websockets

print(f"Server started at port: 2604")
async def handle_connection(websocket, path):
    print(f"Client connected from {websocket.remote_address}")

    try:
        while True:
            message = await websocket.recv()
            print(f"Received message: {message}")
            # Handle the received message as needed
    except websockets.exceptions.ConnectionClosedError:
        print("Connection closed")

start_server = websockets.serve(handle_connection, "0.0.0.0", 2604)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
