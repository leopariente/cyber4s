const addNewTasks = document.createElement("div");
const inputTask = document.createElement("input");
inputTask.placeholder = "Add your new todo";
const addTaskButton = document.createElement("button");
const taskList = document.createElement("ul");

function loadPage() {
    document.body.appendChild(addNewTasks);
    addTaskButton.textContent = "+";
    addNewTasks.appendChild(inputTask);
    addNewTasks.appendChild(addTaskButton);
    document.body.appendChild(taskList);

    addTaskButton.addEventListener("click", () => addTask(inputTask.value));
}

function deleteTask(todoItem) {
    todoItem.remove();
    console.log(taskToDelete);
}

function editTask(event) {

}

function addTask(task) {
    inputTask.value = "";
 if (task === "") {
     alert("please write something before creating a task!")
 }
 else {
     const todoItem = document.createElement("div");
     const todoValue = document.createElement("li");
     todoValue.textContent = task;

     const deleteButton = document.createElement("button");
     const editButton = document.createElement("button");

     deleteButton.textContent = "Delete";
     editButton.textContent = "Edit";

     deleteButton.addEventListener("click", () => deleteTask(todoItem));
     editButton.addEventListener("click", editTask);

     taskList.appendChild(todoItem);
     todoItem.appendChild(todoValue);
     todoItem.appendChild(editButton);
     todoItem.appendChild(deleteButton);
 }
}

window.addEventListener("load", loadPage);
