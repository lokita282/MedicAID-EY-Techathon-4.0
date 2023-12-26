import Appointments from '../models/Appointments.js'
import User from '../models/User.js'
import mongodb from 'mongodb'

//create an appointment
const createNewAppointment = async (req, res) => {
  try {
    const doctor = await User.findOne({ _id: req.body.doctorId })

    const appointment = await new Appointments({
      patientId: req.user,
      ...req.body,
      doctorId: doctor,
    })

    // console.log('here')
    // appointment.save()
    // res.status(201).json({
    //         message: 'New appointment created!',
    //         appointment,
    //       })

        

    //checking doctor's schedule
    var calendarEvents = []
    const appointments = await Appointments.find({
      doctorId: new mongodb.ObjectId(doctor),
    })

    for (let i = 0; i < appointments.length; i++) {
      calendarEvents.push({
        id: appointments[i]._id,
        title: appointments[i].title,
        start: new Date(appointments[i].start), 
        end: new Date(appointments[i].end),
      })
    }

    calendarEvents = calendarEvents.sort(function (a, b) {
      var keyA = new Date(a.start),
        keyB = new Date(b.start)
      // Compare the 2 dates
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
      return 0
    })

    console.log(calendarEvents)

    if (calendarEvents === []) {
      appointment.start = appointment.startArr[0]
          appointment.end = appointment.endArr[0]
          console.log(appointment)
          await appointment.save()
          res.status(201).json({
            message: 'New appointment created!',
            appointment,
          })
    }

    var stop = false
    for (let i = 0; i < appointment.startArr.length && !stop; i++) {
      for (let j = 0; j < calendarEvents.length && !stop; j++) {
        // console.log("i" + i)
        // console.log("j" + j)
        if (new Date(appointment.startArr[i]) >= calendarEvents[j].end) {
          // console.log('in')
          // console.log(new Date(appointment.startArr[i]) >= calendarEvents[j].end)
          // console.log(new Date(appointment.startArr[i]).toString() )
          // console.log(calendarEvents[j].end.toString())
          appointment.start = appointment.startArr[i]
          appointment.end = appointment.endArr[i]
          console.log(appointment)
          await appointment.save()
          stop = true
          break
        } else if (new Date(appointment.endArr[i]) <= calendarEvents[j].start) {
          console.log('in2')
          appointment.end = appointment.endArr[i]
          appointment.start = appointment.startArr[i]
          await appointment.save()
          stop = true
          break
        } else if (
          new Date(appointment.startArr[i]) < calendarEvents[j].start &&
          new Date(appointment.endArr[i]) < calendarEvents[j].end
        ) {
          console.log('in3')
          appointment.end = appointment.endArr[i]
          appointment.start = appointment.startArr[i]
          await appointment.save()
          stop = true
          break
        } 
        else {
          if (i === appointment.startArr.length - 1 && j === calendarEvents.length -1){
            throw 'The doctor is booked for these time slots please try again!'
            stop = true
            break
          }
          i++
          continue
        }
      }
    }
    if (appointment.start === null) throw 'The doctor is booked for these time slots please try again!'
    res.status(201).json({
      message: 'New appointment created!',
      appointment,
    })
    
  } catch (e) {
    console.log(e)
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

//Get all appointments of a doctor
const getAppointmentsDoctor = async (req, res) => {
  try {
    const calendarEvents = []
    const appointments = await Appointments.find({
      doctorId: req.user._id,
    })
    for (let i = 0; i < appointments.length; i++) {
      appointments[i].patientId = await User.findOne({
        _id: appointments[i].patientId,
      })
      calendarEvents.push({
        id: appointments[i]._id,
        title: appointments[i].title,
        start: new Date(appointments[i].start).toString(),
        end: new Date(appointments[i].end).toString(),
      })
      // console.log(new Date(appointments[i].start))
    }
    await res.status(200).json({
      message: 'View all appointments!',
      appointments,
      calendarEvents,
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

//Get all appointments of a patient (patient history for doctor)
const getAppointmentsPatient = async (req, res) => {
  try {
    const appointments = await Appointments.find({
      doctorId: req.user._id,
      patientId: new mongodb.ObjectId(req.params.id),
    })
    res.status(200).json({
      message: 'View patient history!',
      appointments,
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

//get single appointment
const getSingleAppointment = async (req, res) => {
  try {
    const appointment = await Appointments.findById(req.params.id)
    appointment.patientId = await User.findOne({
      _id: appointment.patientId,
    })
    res.status(200).json({
      message: 'View single appointment!',
      appointment,
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

// //get calendar appointments
// const getCalendarDoctor = async (req, res) => {
//   try {
//     const appointments = await Appointments.find({
//       doctorId: req.user._id,
//     })
//     for (let i = 0; i < appointments.length; i++) {
//       appointments[i].patientId = await User.findOne({ _id: appointments[i].patientId })
//     }
//     await res.status(200).json({
//       message: 'View all appointments!',
//       appointments,
//     })
//   } catch (e) {
//     res.status(400).json({
//       success: false,
//       message: e.message,
//     })
//   }
// }

export {
  createNewAppointment,
  getAppointmentsDoctor,
  getAppointmentsPatient,
  getSingleAppointment,
}
