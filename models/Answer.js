import mongoose, { Schema } from "mongoose"

const answerSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  poll: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },
  value: String,
})

const Answer = mongoose.model("Answer", answerSchema)

export default Answer
