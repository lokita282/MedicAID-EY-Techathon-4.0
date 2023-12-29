import express from 'express'
import auth from '../middleware/auth.js'
import { addReport, getReports } from '../controllers/reports.js'

const router = new express.Router()

//Upload a report
router.post('/upload', auth.verifyJWT, addReport)

//Get all reports
router.get('/getall', auth.verifyJWT, getReports)

export default router
