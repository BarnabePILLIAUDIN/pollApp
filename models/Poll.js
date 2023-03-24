import mongoose, { Schema } from "mongoose"

const pollSchema = new mongoose.Schema({
  owner: { type: Schema.Types.ObjectId },
  question: String,
  choices: [String],
})

const Poll = mongoose.model("Poll", pollSchema)

export default Poll
