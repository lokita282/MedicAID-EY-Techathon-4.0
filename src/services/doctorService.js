import httpcommon from '../httpcommon'
import httpcommonml from '../httpcommon-ml'

export const getAllAppointments = () => {
    return httpcommon.get(`/appointments/get`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('eyToken')}`,
      },
    })
  }

  export const getAllPatients = () => {
    return httpcommon.get(`/user/allpatients`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('eyToken')}`,
      },
    })
  }

  export const getSingleAppointmentDetails = (id) => {
    return httpcommon.get(`/appointments/get_appointment/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('eyToken')}`,
      },
    })
  }

  export const getAppointmentHistory = (id) => {
    return httpcommon.get(`/appointments/get_patient_history/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('eyToken')}`,
      },
    })
  }

  export const getDifferentialDiagnoses = (data) => {
    return httpcommonml.post(`/diff-diagnosis`, data)
  }

  export const getReports = () => {
    return httpcommon.get(`/reports/getall`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('eyToken')}`,
      },
    })
  }
  
  export const getAppointmentReport = (id) => {
    return httpcommon.get(`/reports/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('eyToken')}`,
      },
    })
  }
  