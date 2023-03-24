import express from "express"
import accountController from "../controllers/account.controller.js"
import mainController from "../controllers/main.controller.js"
import auth from "../middlewares/auth.js"
import getInfos from "../middlewares/getInfos.js"

const mainRouter = express.Router()

//GET

//POLLS
mainRouter.get("/", auth, getInfos, mainController.showHomePage)
mainRouter.get("/addPoll", auth, getInfos, mainController.showAddPoll)
mainRouter.get("/allPolls/:last", auth, getInfos, mainController.showAllPolls)
mainRouter.get("/vote/:pollId", auth, getInfos, mainController.showVotePage)
mainRouter.get("/results/:pollId", mainController.showResults)
mainRouter.get("/myaccount", auth, getInfos, mainController.showMyAccount)

//ACCOUNTS
mainRouter.get("/signup", accountController.showSignupPage)
mainRouter.get("/signin", accountController.showSigninPage)
mainRouter.get("/logout", accountController.logout)
//POST

//POLLS
mainRouter.post("/addPoll", auth, getInfos, mainController.handlePollAdd)
mainRouter.post("/getvote/:id", auth, getInfos, mainController.getVote)

//ACCOUNTS
mainRouter.post("/createaccount", accountController.createaccount)
mainRouter.post("/login", accountController.login)

export default mainRouter
