import { useState, useEffect } from 'react';
import FileInput from './FileInput';

const ChatWindow = ({ messages, userId }) => {
  useEffect(() => {
    const markMessagesAsRead = async () => {
      const unreadMessages = messages.filter((msg) => !msg.isRead && msg.receiverId === userId);
      await Promise.all(
        unreadMessages.map((msg) =>
          fetch(`/api/messages/${msg._id}/read`, { method: 'PUT' })
        )
      );
    };

    markMessagesAsRead();
  }, [messages]);

  
  return (
    <div className="chat-window">
        <FileInput onFileSelect={setFile}>
            <button onClick={sendMessage}>Enviar</button>
        </FileInput>
      {messages.map((msg) => (
        <div key={msg._id} className={msg.isRead ? 'read' : 'unread'}>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
};


const setFile = () => {
    const [file, setFile] = useState(null);


    const sendMessage = async () => {
        const formData = new FormData();
        formData.append('attachment', file);


        await fetch('/api/messages', { method: 'POST', body: formData });
        setFile(null);
    };
}





export default ChatWindow;
