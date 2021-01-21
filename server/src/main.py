from flask import Flask
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def on_connect():
    print('GOOD')

@socketio.on('message')
def on_msg(data):
    send(data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)