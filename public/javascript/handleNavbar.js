const nav = document.querySelector("nav")
const toggler = document.getElementById("navbar-toggler")
const toggler2 = document.getElementById("navbar-toggler-2")

const width = window.screen.width

let left = 0
let visible = false

toggler.addEventListener("click", () => {
  nav.style.left = "0"
  toggler2.style.top = "90%"
  visible = true
})

toggler2.addEventListener("click", () => {
  nav.style.left = "-100%"
  visible = false
})

window.addEventListener("mousemove", (e) => {
  if (e.clientX > 250 && visible) {
    nav.style.left = "-100%"
    visible = false
    return
  }
  if (e.clientX < 20 && !visible) {
    toggler2.style.top = "90%"
    nav.style.left = "0"
    visible = true
  }
})
