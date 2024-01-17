console.log("Welcome to do my TODO App");

let todos = [];

let toDoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");
let getPendingTodos = document.querySelector(".get-todos");

getPendingTodos.addEventListener("click", () => {
  console.log("Inside Pending Todos");
  todos = todos.filter((todo) => todo.status !== "Finished");
  reRenderTodos();
});

todoInputBar.addEventListener("keyup", function toggleSaveButton(event) {
  let todotext = todoInputBar.value;

  // Toggle save button based on text length
  if (todotext.length == 0) {
    if (saveButton.classList.contains("disabled")) return;
    saveButton.classList.add("disabled");
  } else if (saveButton.classList.contains("disabled")) {
    saveButton.classList.remove("disabled");
  }

  // If Enter key is pressed, call addTodo function
  if (event.key === "Enter") {
    getTextAndTodo();
  }
});

function getTextAndTodo() {
  let todotext = todoInputBar.value;
  if (todotext.length == 0) return;
  let todo = {
    text: todotext,
    status: "In progress",
    finishButtonText: "Finished",
  };
  todos.push(todo);
  addToDo(todo, todos.length);
  todoInputBar.value = "";
}

saveButton.addEventListener("click", getTextAndTodo);

function reRenderTodos() {
  toDoDataList.innerHTML = ""; //* removing the innerHTML
  todos.forEach((element, idx) => {
    addToDo(element, idx + 1);
  });
}

function finishTodo(event) {
  let finishButtonPressed = event.target;
  let indexTobeFinished = Number(finishButtonPressed.getAttribute("todo-idx"));

  // TODO: Implement the Toggle functionality - Finished and Undo
  // ? Toggling Functionality
  if (todos[indexTobeFinished].status == "Finished") {
    todos[indexTobeFinished].status = "In progress";
    todos[indexTobeFinished].finishButtonText = "Finished";
  } else {
    todos[indexTobeFinished].status = "Finished";
    todos[indexTobeFinished].finishButtonText = "Undo";
  }

  todos.sort((a, b) => {
    if (a.status == "Finished") {
      return 1; // if you return 1 b is placed before a
    }
    return -1; // if you return -1 b is placed after a
  });
  reRenderTodos();
}

//* This is the removeToDo function which removes the task from the app
function removeTodo(event) {
  // console.log(
  //   "clicked",
  //   event.target.parentElement.parentElement.parentElement
  // );
  // event.target.parentElement.parentElement.parentElement.remove();
  let deleteButtonPressed = event.target; //* Using target we can get the HTML on which the event is happening
  let indexTobeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
  todos.splice(indexTobeRemoved, 1);

  toDoDataList.innerHTML = ""; //* removing the innerHTML

  //* here we are looping over the array of todos so that we can display them

  reRenderTodos();

  //  TODO: Remove the task from the todo array so that we have a proper Serial Number
  //  *For this you can add attributes - setAttribute and getAttribute
}

// TODO: Write a function for editing a todo task
function editTodo(event) {
  let editButtonPressed = event.target;
  let indexTobeEdited = Number(editButtonPressed.getAttribute("todo-idx"));
  let detailDiv = document.querySelector(`div[todo-idx="${indexTobeEdited}"]`);
  let input = document.querySelector(`input[todo-idx="${indexTobeEdited}"]`);
  detailDiv.style.display = "none";
  input.type = "text";
  input.value = detailDiv.textContent;
}

function saveEditedTodo(event) {
  let input = event.target;
  let indexTobeEdited = Number(input.getAttribute("todo-idx"));
  let detailDiv = document.querySelector(`div[todo-idx="${indexTobeEdited}"]`);

  if (event.keyCode == 13) {
    detailDiv.textContent = input.value;
    detailDiv.style.display = "block";
    input.value = "";
    input.type = "hidden";
  }
}

function addToDo(todo, todoCount) {
  let rowDiv = document.createElement("div");
  let todoItem = document.createElement("div");
  let todoNumber = document.createElement("div");
  let toDoDetail = document.createElement("div");
  let todoStatus = document.createElement("div");
  let todoActions = document.createElement("div");
  let deleteButton = document.createElement("button");
  let finishedButton = document.createElement("button");
  let editButton = document.createElement("button");
  let hiddenInput = document.createElement("input");
  let hr = document.createElement("hr");

  // TODO: Add the classes to the new elements
  //* Adding classes
  rowDiv.classList.add("row");
  todoItem.classList.add(
    "todo-item",
    "d-flex",
    "flex-row",
    "justify-content-around",
    "align-items-center",
    "actual-todos"
  );
  todoNumber.classList.add("todo-number");
  toDoDetail.classList.add("todo-detail", "text-muted");
  todoStatus.classList.add("todo-status", "text-muted", "actual-status");
  todoActions.classList.add(
    "todo-action",
    "d-flex",
    "justify-content-start",
    "gap-2"
  );
  deleteButton.classList.add("btn", "btn-danger", "mx-2", "delete-todo");
  finishedButton.classList.add("btn", "btn-success", "finish-todo");
  editButton.classList.add("btn", "btn-warning", "edit-todo");
  hiddenInput.classList.add("form-control", "todo-detail");

  // TODO: Set the attributes to make the buttons work
  // ? Set the attribute - so that finished button has todo-idx attribute
  finishedButton.setAttribute("todo-idx", todoCount - 1);

  // ? Set the attribute - so that delete button has todo-idx attribute
  deleteButton.setAttribute("todo-idx", todoCount - 1);

  editButton.setAttribute("todo-idx", todoCount - 1);

  hiddenInput.setAttribute("todo-idx", todoCount - 1);

  toDoDetail.setAttribute("todo-idx", todoCount - 1);

  // TODO: Attach the event listeners
  deleteButton.onclick = removeTodo; //? attaching event listener to the delete button when we create the todo itself
  finishedButton.onclick = finishTodo; //? adding event listener to the finish button when we create the todo itself
  editButton.onclick = editTodo;
  hiddenInput.type = "hidden";
  hiddenInput.addEventListener("keypress", saveEditedTodo);

  // TODO: Set the textContent for the new elements
  todoNumber.textContent = `${todoCount}.`;
  toDoDetail.textContent = todo.text; //* sets the to do text sent from the input element
  todoStatus.textContent = todo.status;
  deleteButton.textContent = "Delete";
  finishedButton.textContent = todo.finishButtonText;
  editButton.textContent = "Edit";

  // TODO: Append the buttons
  todoActions.appendChild(deleteButton);
  todoActions.appendChild(finishedButton);
  todoActions.appendChild(editButton);

  // TODO: Append all the elements to the todoItem
  todoItem.appendChild(todoNumber);
  todoItem.appendChild(toDoDetail);
  todoItem.appendChild(hiddenInput);
  todoItem.appendChild(todoStatus);
  todoItem.appendChild(todoActions);

  // TODO: Append the item and a horizontal line to the rowDiv
  rowDiv.appendChild(todoItem);
  rowDiv.appendChild(hr);

  toDoDataList.appendChild(rowDiv);
}
