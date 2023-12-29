import Reports from '../models/Reports.js'
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


export { addReport, getReports }