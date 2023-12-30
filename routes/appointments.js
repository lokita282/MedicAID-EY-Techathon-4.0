import express from 'express'
import auth from '../middleware/auth.js'
import {
  createNewAppointment,
  getAppointmentsDoctor,
  getAppointmentsPatient,
  getSingleAppointment,
  addReport,
  updateAppointment,
  getPatientUpcomingAppointments,
} from '../controllers/appointments.js'

const router = new express.Router()

//create new appointment
router.post('/new',auth.verifyJWT, createNewAppointment)

router.post('/report', auth.verifyJWT, addReport)

//get all appointments 
router.get('/get', auth.verifyJWT, getAppointmentsDoctor) 

//get all appointments of a patient (patient history) 
router.get('/get_patient_history/:id', auth.verifyJWT, getAppointmentsPatient) 

//get single appointment 
router.get('/get_appointment/:id', auth.verifyJWT, getSingleAppointment) 

//Update appointment
router.patch('/update/:id', auth.verifyJWT, updateAppointment)

//get upcoming appointments for patient
router.get('/get_upcoming', auth.verifyJWT, getPatientUpcomingAppointments) 

export default router
