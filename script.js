const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value == "") {
    alert("You should write something.");
  } else {
    let li = document.createElement("li");

    // get due date
    let dueDate = document.getElementById("due-date").value;

    // format due date if it exists
    let dueDateText = dueDate
      ? " (Due: " + new Date(dueDate).toLocaleString() + ")"
      : "";

    li.innerHTML = inputBox.value + dueDateText;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName == "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName == "SPAN") {
      e.target.parentElement.remove();
    }
  },
  false
);

function removeAllTasks() {
  listContainer.innerHTML = "";
  saveData();
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  //
  const selectElements = document.querySelectorAll(".task-priority select");
  selectElements.forEach((selectElement) => {
    const priority = selectElement.value;
    const taskItem = selectElement.parentNode.parentNode;
    taskItem.classList.add(`${priority}-priority`);
  });
}

showTask();
