import httpcommon from '../httpcommon'

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