import jwt from "jsonwebtoken"
import getTocken from "../helpers/getToken.js"
import hashPassword from "../helpers/hashpassword.js"
import User from "../models/User.js"

const accountController = {
  showSignupPage(req, res) {
    res.render("signup.ejs", { error: "", connected: req.connected })
  },
  async createaccount(req, res) {
    const { email, password, first, last } = req.body

    const [hashedPassword, salt] = hashPassword(password)

    try {
      const user = User({
        email,
        hashedPassword,
        salt,
        first,
        last,
      })
      await user.save()
    } catch (err) {
      if (err.code === 11000) {
        res.render("signup.ejs", {
          error: "This email is already used please sign in!",
          connected: req.connected,
        })
        return
      }
    }
    res.redirect("/")
  },
  async showSigninPage(req, res) {
    res.render("signin.ejs", { error: "", connected: req.connected })
  },
  async login(req, res) {
    const { email, password } = req.body
    const data = await User.find({ email }).exec()
    if (data.length === 0) {
      res.render("signup.ejs", {
        error: "Email not found you have been redirected to the signup page",
        connected: req.connected,
      })
      return
    }
    if (data.length > 1) {
      res.render("signup.ejs", {
        error: "An error has occured",
        connected: req.connected,
      })
    }
    const user = data[0]
    const [hashedPassword] = hashPassword(password, user.salt)

    if (hashedPassword === user.hashedPassword) {
      const token = jwt.sign({ userId: user._id }, process.env["JWT-SECRET"])
      res.cookie("pollAppToken", token)
      res.redirect("/")
      return
    }
    res.render("signin.ejs", {
      error: "Invalids credentials",
      connected: req.connected,
    })
  },
  logout(req, res) {
    res.clearCookie("pollAppToken")
    res.redirect("/")
  },
}

export default accountController
