import jwt from "jsonwebtoken"
import getToken from "../helpers/getToken.js"

const auth = (req, res, next) => {
  try {
    const { cookie } = req.headers
    const token = getToken(cookie)
    const cleanToken = jwt.decode(token)
    req.token = cleanToken
  } catch {
    console.log("incorrect token")
    req.token = false
  }
  next()
}

export default auth
