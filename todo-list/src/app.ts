const addNewTasks = document.createElement("div");
const inputTask = document.createElement("input");
inputTask.placeholder = "Add your new todo";
const addTaskButton = document.createElement("button");
const taskList = document.createElement("ul");
const totalTasks = document.createElement("p");

let remainingTasks: number = 0;
let editMode: boolean = false;

totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();

function loadPage() {
    document.body.appendChild(addNewTasks);
    addTaskButton.textContent = "+";
    addNewTasks.appendChild(inputTask);
    addNewTasks.appendChild(addTaskButton);
    document.body.appendChild(taskList);
    document.body.appendChild(totalTasks);

    addTaskButton.addEventListener("click", () => addTask(inputTask.value));
}

function deleteTask(todoItem: any, checkBox: any) {
    if (checkBox.checked === false) {
    remainingTasks-=1;
    }
    todoItem.remove();
    totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();
}

function editTask(todoItem: HTMLDivElement, valueToEdit: HTMLElement) {
    if (editMode === false) {
        editMode = true;
    const editedText = document.createElement("input");
    const confirmEdit = document.createElement("button");
    confirmEdit.textContent = "Confirm";
    editedText.placeholder = "Enter your edited task here"
    todoItem.appendChild(editedText);
    todoItem.appendChild(confirmEdit);
    confirmEdit.addEventListener("click", () => confirmText(editedText, valueToEdit, todoItem))
    }
}

function confirmText(editedText: HTMLInputElement, valueToEdit: HTMLElement, todoItem: any) {
    console.log(editedText.value);
    if (editedText.value !== "") {
        valueToEdit.textContent = editedText.value;
    }
    todoItem.removeChild(todoItem.lastElementChild);
    todoItem.removeChild(todoItem.lastElementChild);
    editMode = false;
}

function changeTaskStatus(checkBox: any) {
    if (checkBox.checked) {
        remainingTasks-=1;
      } else {
          remainingTasks+=1;
      }
      totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();
}

function addTask(task: string) {
    inputTask.value = "";
 if (task === "") {
     alert("please write something before creating a task!")
 }
 else {
     remainingTasks+=1;
     totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();
    createTask();
 }

 function createTask() {
    const todoItem = document.createElement("div");
    const todoValue = document.createElement("li");
    todoValue.textContent = task;
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    deleteButton.textContent = "Delete";
    editButton.textContent = "Edit";
    
    taskList.appendChild(todoItem);
    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoValue);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);

    checkBox.addEventListener('change', () => changeTaskStatus(checkBox))
    deleteButton.addEventListener("click", () => deleteTask(todoItem, checkBox));
    editButton.addEventListener("click", () => editTask(todoItem, todoValue));
 }

}

window.addEventListener("load", loadPage);
