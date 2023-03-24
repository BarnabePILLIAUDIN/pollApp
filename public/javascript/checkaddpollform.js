const addForm = document.getElementById("addForm")
const questionInput = document.getElementById("question")
const a1Input = document.getElementById("a1")
const a2Input = document.getElementById("a2")

addForm.addEventListener("submit", (e) => {
  if (!questionInput.value || !a1Input.value || !a2Input.value) {
    e.preventDefault()
    alert("Your poll must have a least one question and two answers")
  }
})
