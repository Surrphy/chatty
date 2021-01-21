import React, { useState } from 'react';
import io from "socket.io-client";
let endpoint = "http://localhost:5000";
let socketConnection = io.connect(endpoint);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  socketConnection.on("message", msg => {
    setMessages([...messages, msg])});

  const onChange = (event) => {
    setMessage(event.target.value);
  };

  const onClick = () => {
    socketConnection.emit("message", `${socketConnection.id}: ${message}`);
    setMessage("");
  };

  return (
    <div className="App">
      <h2>Messages</h2>
      <div>
        {messages.map(msg => (<p>{msg}</p>))}
      </div>
      <p>
        <input type="text" onChange={onChange} value={message} />
      </p>
      <p>
        <input type="button" onClick={onClick} value="Send"/>
      </p>
    </div>
  );
};

export default App;
