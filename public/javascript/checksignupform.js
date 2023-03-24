const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const first = document.getElementById("first")
const last = document.getElementById("last")

email.addEventListener("input", () => {
  email.className = email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    ? "correct"
    : "error"
})

form.addEventListener("submit", (e) => {
  if (
    !email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ||
    !password.value ||
    !last.value ||
    !first.value
  ) {
    e.preventDefault()
    alert(
      "Please enter a correct email, a paswword, your first name, and your last name before submitting the form"
    )
  }
})
