import mongoose from 'mongoose'

const connectionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
})

export default mongoose.model('Connection', connectionSchema)
