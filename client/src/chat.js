import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
let endpoint = "http://localhost:5000";
let socket = io.connect(endpoint);

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [nick, setNick] = useState('quest');

    socket.on("message", msg => {
        setMessages([...messages, msg])
    });

    const onChange = event => {
        setMessage(event.target.value)
    };

    const onClick = () => {
        socket.emit("message", `${nick}: ${message}`);
        setMessage('');
    };

    const onChangeNick = event => {
        setNick(event.target.value);
    };

    return(
        <div className="chat">
            <h2>Messages</h2>
            <div className="chatMsg">{messages.map(msg => (<p>{msg}</p>))}</div>
            <div className="chatBar">
                <input type="text" onChange={onChangeNick} value={nick} className="nickInput"/>
                <input type="text" onChange={onChange} value={message} className="chatInput" />
                <input type="button" onClick={onClick} value="Send" className="chatSend" />
            </div>
        </div>
    );
};

export default Chat;