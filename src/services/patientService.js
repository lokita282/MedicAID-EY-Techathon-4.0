import httpcommon from "../httpcommon";
import httpcommonml from "../httpcommon-ml";

export const postChatbotMessage = (data) => {
  return httpcommonml.post(`/chatbot`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("eyToken")}`,
    },
  });
};

export const getAllDoctors = () => {
  return httpcommon.get(`/user/alldoctors`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("eyToken")}`,
    },
  });
};

export const getPatientProfile = () => {
  return httpcommon.get(`user/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("eyToken")}`,
    },
  });
};

export const postAppointment = (data) => {
  return httpcommon.post(`appointments/new`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("eyToken")}`,
    },
  });
};

export const getDoctorsInteractedWith = () => {
  return httpcommon.get(`user/docs_interacted_with`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("eyToken")}`,
    },
  });
};
