import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import mainRouter from "./routers/main.routes.js"

dotenv.config()

const PORT = process.env["PORT"]
const DBPATH = process.env["DBPATH"]
const app = express()

await mongoose.connect(DBPATH)

app.set("view-engine", "ejs")

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", mainRouter)

app.listen(3000, () => {
  console.log("I'm on !")
})
