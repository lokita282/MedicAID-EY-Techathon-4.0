import Reports from '../models/Reports.js'
import mongodb from 'mongodb'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

//Add image of the report
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname +'-'+ Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage
}).single('reports')

const uploadMulti = multer({
  storage,
}).array('generalReports')

const addReport = async (req, res) => {
  
  upload(req, res, (err) => {
    if (err) {
      res.json({
        success: false,
        error: err.message,
      })
    } else {
      const imageFile = req.file.path
      const base64 = fs.readFileSync(imageFile, { encoding: 'base64' })
      console.log(base64)
      const report = new Reports({
        reports: base64,
        appointment: req.body.appointment,
      })
      

      // Convert the image to Base64

      
      report.save().then(() =>
        res.json({
          success: true,
        })
      ) 
    }
   
  })
}

const addGeneralReports = async (req, res) => {
  uploadMulti(req, res, (err) => {
    if (err) {
      res.json({
        success: false,
        error: err.message,
      })
    } else {
      var generalReports = []
      for (let i = 0 ; i <req.files.length ; i++) {
        const imageFile = req.files[i].path
        const base64 = fs.readFileSync(imageFile, { encoding: 'base64' })
        console.log(base64)
        generalReports.push(base64)
        
      }
      const report = new Reports({
        generalReports,
        patientId: req.user._id,
      })

      // Convert the image to Base64

      report.save().then(() =>
        res.json({
          success: true,
        })
      )
    }
  })
}

//Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await Reports.find({})
    res.json(reports)
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    })
  }
}

//Get appointmentwise reports
const getAppointmentwiseReport = async (req, res) => {
  try {
    console.log(req.params.id)
    const report = await Reports.findOne({appointment: req.params.id})
    res.status(200).json({
      message: 'View report of this appointment!',
      report,
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

//Get a patient's general reports
const getGeneralReports = async (req, res) => {
  try {
    const reports = await Reports.find({
      patientId: new mongodb.ObjectId(req.params.id),
    })
    res.status(200).json({
      message: 'View reports of this appointment!',
      reports,
    })
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}



export {
  addReport,
  getReports,
  getAppointmentwiseReport,
  addGeneralReports,
  getGeneralReports,
}