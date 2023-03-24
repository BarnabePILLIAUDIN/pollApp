const form = document.querySelector("form")
const checkboxes = document.querySelectorAll("input[type='checkbox']")

let checked = 0

form.addEventListener("submit", (e) => {
  checkboxes.forEach((element) => {
    if (element.checked) {
      checked += 1
    }
  })
  if (checked != 1) {
    e.preventDefault()
    alert(
      checked === 0
        ? "You must chose one answer"
        : "You must chose only one answer"
    )
  }
})
