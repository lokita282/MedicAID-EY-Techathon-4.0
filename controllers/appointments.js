import Appointments from '../models/Appointments.js'
import User from '../models/User.js'

//create an appointment
const createNewAppointment = async (req, res) => {
  try {
    const doctor = await User.findOne({_id: req.body.doctorId})
    console.log(doctor)

    const appointment = await new Appointments({
      patientId: req.user,
      ...req.body,
      doctorId: doctor}
    )
  
    console.log(appointment)
    await appointment.save()
    res.status(201).json({
      message: 'New appointment created!',
      appointment,
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

//Get all appointments of a doctor
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.find({
      doctorId: req.user._id,
    })
    for (let i = 0; i < appointments.length; i++) {
      appointments[i].patientId = await User.findOne({ _id: appointments[i].patientId })
    }
    await res.status(200).json({
      message: 'View all appointments!',
      appointments,
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

export { createNewAppointment, getAppointments }
