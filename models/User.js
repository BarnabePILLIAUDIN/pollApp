import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
  email: { unique: true, type: String },
  hashedPassword: String,
  salt: String,
  first: String,
  last: String,
})

const User = mongoose.model("User", userSchema)

export default User
