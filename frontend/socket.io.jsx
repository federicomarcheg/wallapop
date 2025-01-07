import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
const socket = io('http://localhost:8080');

const sendMessage = (message) => {
    socket.emit('sendMessage', { sender: 'user1', recipient: 'user2', message });
};

socket.on('receiveMessage', (data) => {
    console.log('Nuevo mensaje:', data);
});


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off('receiveMessage');
  }, []);

  const sendMessage = () => {
    const messageData = { sender: 'user1', recipient: 'user2', content: input };
    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, messageData]);
    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg.content}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe un mensaje"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Chat;
