import Reports from '../models/Reports.js'
import multer from 'multer'
import path from 'path'

//Add image of the artwork
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
      const report = new Reports({
        reports: req.file.filename,
        appointment: req.body.appointment
      })
      report.save().then(() =>
        res.json({
          success: true,
        })
      ) 
    }
   
  })
}

export {addReport}