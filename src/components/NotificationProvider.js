import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext({
  addMessage: () => false,
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = (props) => {
  const [messages, addMessage] = useState([]);

  return (
    <NotificationContext.Provider
      value={{
        messages,
        addMessage,
      }}>
      {props.children}
    </NotificationContext.Provider>
  );
};
