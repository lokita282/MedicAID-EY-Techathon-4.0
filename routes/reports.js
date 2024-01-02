import express from 'express'
import auth from '../middleware/auth.js'
import {
  addReport,
  getReports,
  getAppointmentwiseReport,
  addGeneralReports,
  getGeneralReports,
} from '../controllers/reports.js'

const router = new express.Router()

//Upload a report
router.post('/upload', auth.verifyJWT, addReport)

//Get all reports
router.get('/getall', auth.verifyJWT, getReports)

//Get appointment wise reports
router.get('/:id', auth.verifyJWT, getReports)

//upload multiple general reports
router.post('/upload_general_reports', auth.verifyJWT, addGeneralReports)

//Get a patient's general reports
router.get('/patient/:id', auth.verifyJWT, getGeneralReports)


export default router
