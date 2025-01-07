import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';




function ChatPage({ productId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:8080/api/messages/${productId}`);
      setMessages(res.data);
    };
    fetchMessages();
  }, [productId]);

  const handleSend = async () => {
    const messageData = {
      sender: 'USER_ID', 
      receiver: 'RECEIVER_ID', 
      productId,
      message: newMessage,
    };
    const res = await axios.post('http://localhost:8080/api/messages', messageData);
    setMessages((prev) => [...prev, res.data]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg._id} className={msg.sender._id === 'USER_ID' ? 'sent' : 'received'}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="send-message">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

const ChatPage = () => {
  const { t } = useTranslation();

  return <input placeholder={t('chat.placeholder')} />;
}



export default ChatPage;


