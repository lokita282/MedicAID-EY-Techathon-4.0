import React from "react";
import { useState } from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleBot = (msg) => {
    const botMessage = createChatBotMessage(`${msg}`, {
      widthAvatar: false,
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleBot,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
