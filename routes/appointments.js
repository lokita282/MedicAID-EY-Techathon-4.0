import express from 'express'
import auth from '../middleware/auth.js'
import {
  createNewAppointment,
  getAppointmentsDoctor,
  getAppointmentsPatient,
  getSingleAppointment,
} from '../controllers/appointments.js'

const router = new express.Router()

//create new appointment
router.post('/new',auth.verifyJWT, createNewAppointment)

//get all appointments 
router.get('/get', auth.verifyJWT, getAppointmentsDoctor) 

//get all appointments of a patient (patient history) 
router.get('/get_patient_history/:id', auth.verifyJWT, getAppointmentsPatient) 

//get single appointment 
router.get('/get_appointment/:id', auth.verifyJWT, getSingleAppointment) 

export default router
