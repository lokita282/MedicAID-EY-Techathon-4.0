import mongoose from 'mongoose'

const reportsSchema = mongoose.Schema({
  appointment: {
    type: Object,
    ref: 'Appointments',
  },
    reports: {
        type: String
      },
      generalReports: [
        {type: String}
      ],
      patientId:{
        type: Object,
    ref: 'User',
      }
})

export default mongoose.model('Reports', reportsSchema)
