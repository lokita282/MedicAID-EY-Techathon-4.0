import httpcommon from "../httpcommon";
import httpcommonml from "../httpcommon-ml";
import httpcommonfile from "../httpcommonfile";

export const postChatbotMessage = (data) => {
  return httpcommonml.post(`/chatbot`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("eyToken")}`,
    },
  });
};

export const uploadReport = (data) => {
  return httpcommonfile.post(`/reports/upload`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("eyToken")}`,
    },
  });
};

export const getPastAppointments = () => {
  return httpcommon.get(`/appointments/get_past`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("eyToken")}`,
    },
  });
};

export const uploadGeneralReport = (data) => {
  return httpcommonfile.post(`/reports/upload_general`, data, {
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

export const getUpcomingAppointments = () => {
  return httpcommon.get(`/appointments/get_upcoming`, {
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
