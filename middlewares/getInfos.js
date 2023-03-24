import User from "../models/User.js"

const getInfos = async (req, res, next) => {
  if (req.token) {
    req.connected = true
    const user = await User.findById(req.token.userId)
    req.user = user
  } else {
    req.connected = false
  }
  next()
}

export default getInfos
