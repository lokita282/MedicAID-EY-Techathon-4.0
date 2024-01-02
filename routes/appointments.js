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
  getUpcomingAppointmentsDoctor,
  getPatientUpcomingAppointmentsForDoc,
  getSinglePatient,
} from '../controllers/appointments.js'

const router = new express.Router()

//create new appointment
router.post('/new',auth.verifyJWT, createNewAppointment)

router.post('/report', auth.verifyJWT, addReport)

//get all appointments for calendar events
router.get('/get', auth.verifyJWT, getAppointmentsDoctor) 

//get upcoming appointments doctor
router.get('/upcoming', auth.verifyJWT, getUpcomingAppointmentsDoctor) 

//get all appointments of a patient (patient history) 
router.get('/get_patient_history/:id', auth.verifyJWT, getAppointmentsPatient) 

//get single appointment 
router.get('/get_appointment/:id', auth.verifyJWT, getSingleAppointment) 

//Update appointment
router.patch('/update/:id', auth.verifyJWT, updateAppointment)

//get upcoming appointments for patient
router.get('/get_upcoming', auth.verifyJWT, getPatientUpcomingAppointments) 

//get upcoming appointments for patient
router.get('/get_upcoming_for_doc/:id', auth.verifyJWT, getPatientUpcomingAppointmentsForDoc) 

//get upcoming appointments for patient
router.get('/get_patient/:id', auth.verifyJWT, getSinglePatient) 

export default router
