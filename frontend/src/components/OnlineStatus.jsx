import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const socket = io('http://localhost:8080');

const OnlineStatus = ({ userId }) => {
    const [onlineUsers, setOnlineUsers] = useState({});


    useEffect(() => {
        socket.emit('userOnline', userId);


        socket.on('updateOnlineStatus', (users) => {
            setOnlineUsers(users);
        });
    }, [userId]);


    return (
        <div>
          {Object.keys(onlineUsers).map((id) => (
            <div key={id}>{id === userId ? 'Tú (en línea)' : `${id} está en línea`}</div>
          ))}
        </div>
      );
};

export default OnlineStatus;