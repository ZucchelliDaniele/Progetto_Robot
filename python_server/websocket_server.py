import asyncio
import websockets
import json
import subprocess

def get_wifi_signal_strength(interface='wlan0'):
    try:
        result = subprocess.run(['iwconfig', interface], capture_output=True, text=True, check=True)
        output_lines = result.stdout.split('\n')
        for line in output_lines:
            if 'Signal level' in line:
                # Extracting the signal level value (in dBm) from the line
                signal_level = int(line.split('Signal level=')[-1].split(' ')[0])
                return signal_level
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
    return None

# Replace 'wlan0' with your actual WiFi interface name if it's different
#wifi_signal_strength = get_wifi_signal_strength('wlan0')
#if wifi_signal_strength is not None:
#    print(wifi_signal_strength)
#else:
#    print("none")

async def handle_connection(websocket, path):
    print(f"Client connected from {websocket.remote_address}")
    try:
        while True:
            message = await websocket.recv()
            try:
                data = json.loads(message)
                # Process the data as needed
                print(f"Processed data: {data}")
            except json.JSONDecodeError:
                print("Invalid JSON format in received message")

    except websockets.exceptions.ConnectionClosedError:
        print("Connection closed")

start_server = websockets.serve(handle_connection, "0.0.0.0", 2604)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()