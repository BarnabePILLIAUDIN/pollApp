//PUT ONLY THE REQ.HEADERS.COOKIE  ON ARGS

const getToken = (cookie) => {
  const allTokens = cookie.split(";")
  let result = ""
  allTokens.forEach((element) => {
    if (element[0] == " ") {
      if (element.slice(0, 14).includes("pollAppToken=")) {
        result = element.slice(14)
      }
    } else {
      if (element.slice(0, 13).includes("pollAppTokens")) {
        result = element.slice(13)
      }
    }
  })
  return result
}

export default getToken
