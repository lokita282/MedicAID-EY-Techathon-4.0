import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import db from './config/db.js'
import morgan from 'morgan'
import userRouter from './routes/user.js'

import cors from 'cors'
// const cron = require('node-cron')

const port = process.env.PORT || 5000

await db()

// Logging incoming requests
app.use(morgan(':method :url :status :response-time ms'))

// Formatting incoming data and allowing cross origin requests
app.use(cors())
// app.use(cors({ origin: true }))
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))


app.use('/api/user', userRouter)


const server = app.listen(port, () =>
  console.log(`server has started on port ${port}`)
)

// const { setAllVoucherStatus } = require('./utils/cron-jobs')

// cron.schedule('0 0 0 * * *', () => {
//   setAllVoucherStatus()
// })

export default server













