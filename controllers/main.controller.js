import Answer from "../models/Answer.js"
import Poll from "../models/Poll.js"

const mainController = {
  async showHomePage(req, res) {
    //function to show the index page

    //We collect all the polls and we keep only the 3 last
    const data = await Poll.find({}).exec()
    const polls = data.slice(-3)

    res.render("index.ejs", {
      polls,
      connected: req.connected,
    })
  },
  showAddPoll(req, res) {
    //Page that render the form page to add a new poll
    //As you need to be connected to add a poll you need to be connected to see the form
    if (req.connected) {
      res.render("addPoll.ejs", { connected: req.connected })
      return
    }
    res.render("signin.ejs", {
      error: "You need to be connected to add a new poll",
      connected: req.connected,
    })
  },
  async handlePollAdd(req, res) {
    //You need to be connected to add a poll
    if (req.connected) {
      //Function that register a new poll in the db
      const choices = []
      //Collecting the datas
      const { question, answer1, answer2, answer3, answer4, answer5 } = req.body
      const owner = req.token.userId
      //As the 2 first answers are mandatory we push them in the array
      choices.push(answer1)
      choices.push(answer2)

      //If there is an optional answer we push it in the array
      if (answer3) {
        choices.push(answer3)
      }
      if (answer4) {
        choices.push(answer4)
      }
      if (answer5) {
        choices.push(answer5)
      }

      //Creating the new poll
      const poll = new Poll({
        owner,
        question,
        choices,
      })

      await poll.save()
      res.redirect("/")
      return
    } else {
      res.render("signin.ejs", {
        error: "You must be connected to add a poll",
        connected: req.connected,
      })
    }
  },
  async showAllPolls(req, res) {
    //Function that render the page with all the polls
    if (req.connected) {
    }
    //Colletcting all the polls
    const data = await Poll.find({}).exec()

    //System that limit the number of poll shown in the page
    const { last } = req.params
    const cleanLast = isNaN(parseInt(last)) ? 5 : parseInt(last)
    const polls = data.slice(last - 5, last)
    const includeLastPoll = data.length < cleanLast + 1

    res.render("allpolls.ejs", {
      polls,
      last: cleanLast,
      includeLastPoll,
      connected: req.connected,
    })
  },
  async showVotePage(req, res) {
    //Render the page that allow you to vote.
    //As you need to be connected to vote you can't see the vote page wiothout being connected

    if (req.connected) {
      const { pollId } = req.params
      //Finding the poll
      const poll = await Poll.findById(pollId)
      const votes = await Answer.find({ poll: poll._id })
      const results = {}
      votes.forEach(({ value }) => {
        if (!results[value]) {
          results[value] = 1
          return
        }
        results[value] += 1
      })
      const totalAnswer = votes.length

      res.render("vote.ejs", {
        poll,
        results,
        totalAnswer,
        connected: req.connected,
        vote: true,
      })
      return
    }
    res.render("signin.ejs", {
      error: "You have to be connected to vote",
      connected: req.connected,
    })
  },
  async getVote(req, res) {
    //Saving the vote in the db
    //You need to be connected to vote

    if (req.connected) {
      const { id } = req.params
      const owner = req.token.userId
      const previousData = await Answer.find({ owner, poll: id })
      if (previousData.length > 1) {
        await Answer.deleteMany({ owner, poll: id })
      }
      if (previousData.length === 50) {
        const answer = previousData[0]
        const { value } = req.body
        answer.value = value
        answer.save()
        return
      }
      const { value } = req.body

      const answer = new Answer({
        owner,
        poll: id,
        value,
      })
      await answer.save()
      res.redirect("/")
      return
    }
    res.render("signin.ejs", {
      error: "You have to be connected to vote",
      connected: req.connected,
    })
  },
  async showMyAccount(req, res) {
    //You need to be connected to see your account
    if (req.connected) {
      //Render the my account page with all your polls and infos
      const { first, last, email, _id } = req.user
      const myPolls = await Poll.find({ owner: _id })

      res.render("myAccount.ejs", {
        connected: req.connected,
        first,
        last,
        email,
        myPolls,
      })
      return
    }
    res.render("signin.ejs", {
      connected: req.connected,
      error: "You need to be connected to see your account",
    })
  },
  async showResults(req, res) {
    //Allows you to see the results without voting
    //You don't have to be log to see the result

    const { pollId } = req.params
    //Finding the poll
    const poll = await Poll.findById(pollId)
    const votes = await Answer.find({ poll: poll._id })
    const results = {}
    votes.forEach(({ value }) => {
      if (!results[value]) {
        results[value] = 1
        return
      }
      results[value] += 1
    })
    const totalAnswer = votes.length

    res.render("vote.ejs", {
      poll,
      results,
      totalAnswer,
      connected: req.connected,
      vote: false,
    })
  },
}

export default mainController
