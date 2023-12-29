import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./config.js";
import MessageParser from "./MessageParser.js";
import ActionProvider from "./ActionProvider.js";
import "./Chatbot.css";

const Chatcomponent = (open) => {
  // const [showBot, toggleBot] = useState(true);
  const saveMessages = (messages) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  return (
    <div className="chat-app">
      {open && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          messageHistory={loadMessages()}
          actionProvider={ActionProvider}
          saveMessages={saveMessages}
        />
      )}
    </div>
  );
};

export default Chatcomponent;
