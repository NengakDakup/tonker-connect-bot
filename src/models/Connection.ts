import mongoose from 'mongoose'

const connectionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
  chatId: { type: String, required: true },
  balance: { type: Number },
})

export default mongoose.model('Connection', connectionSchema)
