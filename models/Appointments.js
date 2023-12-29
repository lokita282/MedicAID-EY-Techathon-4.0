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
    startArr: [{
      type: String,
      required: true,
    }], 
    endArr: [{
      type: String,
      required: true,
    }],
    start: {
      type: String,
      required: true,
      // unique: [true, 'time slot already taken'],
    },
    end: {
      type: String,
      required: true,
      // unique: [true, 'time slot already taken'],

    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['consultation', 'followup', 'visited'],
    },
    symptoms: {
      type: Array,
      default: [],
    },
    meetingId: {
      type: String,
    },
    prescription: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Appointments', appointmentsSchema)