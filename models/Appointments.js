import mongoose from 'mongoose'

const appointmentsSchema = mongoose.Schema(
  {
    patientId: {
      type: Object,
      required: true,
      ref: 'User',
    },
    doctorId: {
      type: Object,
      required: true,
      ref: 'User',
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['consultation', 'followup'],
    },
    symptoms: {
      type: Array,
      default: [],
    },
    prescription: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Appointments', appointmentsSchema)