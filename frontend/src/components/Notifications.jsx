import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on('receiveNotification', (notification) => {
            setNotifications((prev) => [notification, ...prev]);
        });
    }, []);


    return (
        <div className="notifications">
          <h2>Notificaciones</h2>
          <ul>
            {notifications.map((notif, index) => (
              <li key={index}>{notif}</li>
            ))}
          </ul>
        </div>
      );
};

export default Notifications;