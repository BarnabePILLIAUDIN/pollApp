const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")

email.addEventListener("input", () => {
  email.className = email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    ? "correct"
    : "error"
})

form.addEventListener("submit", (e) => {
  if (
    !email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ||
    !password.value
  ) {
    e.preventDefault()
    alert("Please enter a correct email, a paswword to sign in")
  }
})
