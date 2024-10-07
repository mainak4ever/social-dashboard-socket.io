'use client'
import { useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';

const socketRef = useRef(null);

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socketRef.current = io('/api/socket');

    socketRef.current.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <p className="text-white">{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
