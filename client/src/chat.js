import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
let endpoint = "http://localhost:5000";
let socket = io.connect(endpoint);

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);

    socket.on("message", msg => {
        setMessages([...messages, msg])
    });

    const onChange = event => {
        setMessage(event.target.value)
    };

    const onClick = () => {
        socket.emit("message", `${socket.id}: ${message}`);
        setMessage('');
    };

    return(
        <div className="chat">
            <h2>Messages</h2>
            <div>{messages.map(msg => (<p>{msg}</p>))}</div>
            <div>
                <input type="text" onChange={onChange} value={message} />
                <input type="button" onClick={onClick} value="Send" />
            </div>
        </div>
    );
};

export default Chat;