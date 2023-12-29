import express from 'express'
import auth from '../middleware/auth.js'
import {
  addReport,
} from '../controllers/reports.js'

const router = new express.Router()


router.post('/upload', auth.verifyJWT, addReport)

export default router
