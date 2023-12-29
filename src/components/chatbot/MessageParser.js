import React, { useState } from "react";
import { postChatbotMessage } from "../../services/patientService";

const MessageParser = ({ children, actions }) => {
  const [loading, setLoading] = useState(false);

  const parse = (message) => {
    setLoading(true);
    var data = JSON.stringify({
      text: message,
    });
    const func = async () => {
      await postChatbotMessage(data).then(async (res) => {
        console.log(res.data.response);
        actions.handleBot(res.data.response);
      });
      setLoading(false);
    };
    func();
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
