import { createChatBotMessage } from "react-chatbot-kit";
const botName = "MedicAID Bot";

const config = {
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}`, { withAvatar: false }),
    createChatBotMessage(
      "I can provide you with accurate and factual medical information based on your query. If you require medical advice or help, please specify your symptoms or concerns, and I will do my best to assist you. Otherwise, feel free to ask any medical-related question you have.",
      {
        withAvatar: false,
        delay: 200,
      }
    ),
  ],
  widgets: [],
  // botName: botName,
  // customStyles: {
  //   botMessageBox: {
  //     backgroundColor: "#376B7E",
  //   },
  //   chatButton: {
  //     backgroundColor: "#5ccc9d",
  //   },
  // },
};

export default config;
