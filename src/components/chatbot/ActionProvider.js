import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { postChatbotMessage } from "../../services/patientService";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.", {
      withAvatar: false,
    });
    console.log("Action:hello");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleBot = (msg) => {
    const botMessage = createChatBotMessage("", {
      widget: "botReply",
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
            handleHello,
            handleBot,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
