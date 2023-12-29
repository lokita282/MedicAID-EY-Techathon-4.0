import mongoose from 'mongoose'

const reportsSchema = mongoose.Schema({
  appointment: {
    type: Object,
    ref: 'Appointments',
  },
    reports: {
        type: String
      }
})

export default mongoose.model('Reports', reportsSchema)
