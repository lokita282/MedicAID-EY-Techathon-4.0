import httpcommon from "../httpcommon";
import httpcommonml from "../httpcommon-ml";

export const postChatbotMessage = (data) => {
  return httpcommonml.post(`/chatbot`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("eyToken")}`,
    },
  });
};
