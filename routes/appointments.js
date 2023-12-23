import express from 'express'
import auth from '../middleware/auth.js'
import {
  createNewAppointment,
  getAppointments,
} from '../controllers/appointments.js'

const router = new express.Router()

//create new appointment
router.post('/new',auth.verifyJWT, createNewAppointment)

//get all appointments
router.get('/get', auth.verifyJWT, getAppointments) 

export default router
