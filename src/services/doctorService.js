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
