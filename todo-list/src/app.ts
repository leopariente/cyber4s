const listDiv = document.createElement("div");
const h1 = document.createElement("h1");
h1.textContent = "TODO List";
listDiv.classList.add("list");
const addNewTasks = document.createElement("div");
addNewTasks.classList.add("addNewTasks")
const inputTask = document.createElement("input");
inputTask.placeholder = "Add your new todo";
const addTaskButton = document.createElement("button");
const taskList = document.createElement("ul");
const totalTasks = document.createElement("p");
totalTasks.classList.add("reamining")

let editMode: boolean = false;

interface todoTask {
    description: string,
    checked: boolean;
}
let listOfTasks: todoTask[] = [];
let remainingTasks: number = listOfTasks.length;

function loadPage() {
    document.body.appendChild(addNewTasks);
    addTaskButton.textContent = "+";
    addNewTasks.appendChild(inputTask);
    addNewTasks.appendChild(addTaskButton);
    listDiv.appendChild(h1);
    listDiv.appendChild(addNewTasks);
    listDiv.appendChild(taskList);
    listDiv.appendChild(totalTasks);
    document.body.appendChild(listDiv);

    addTaskButton.addEventListener("click", () => addTask(inputTask.value));
    let values = (JSON.parse(localStorage.getItem("tasks")!));
    totalTasks.textContent = "remaining tasks: " + values.length.toString();
    remainingTasks = values.length;
    for (let task of values) {
        createTask(task.description);
    }
}

function deleteTask(todoItem: any, checkBox: any, task: todoTask) {
    if (checkBox.checked === false) {
        remainingTasks -= 1;
    }
    todoItem.remove();
    totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();
    const index = listOfTasks.indexOf(task);
    if (index > -1) {
        listOfTasks.splice(index, 1); // 2nd parameter means remove one item only
        window.localStorage.setItem('tasks', JSON.stringify(listOfTasks));
        remainingTasks = listOfTasks.length;
    }
}

function editTask(todoItem: HTMLDivElement, valueToEdit: HTMLElement, task: todoTask) {
    if (editMode === false) {
        editMode = true;
        const editedText = document.createElement("input");
        const confirmEdit = document.createElement("button");
        confirmEdit.textContent = "Confirm";
        editedText.placeholder = "Enter your edited task here"
        todoItem.appendChild(editedText);
        todoItem.appendChild(confirmEdit);
        confirmEdit.addEventListener("click", () => confirmText(editedText, valueToEdit, todoItem, task))
    }
}

function confirmText(editedText: HTMLInputElement, valueToEdit: HTMLElement, todoItem: any, task: todoTask) {
    console.log(editedText.value);
    todoItem.removeChild(todoItem.lastElementChild);
    todoItem.removeChild(todoItem.lastElementChild);
    editMode = false;
    if (editedText.value !== "") {
        valueToEdit.textContent = editedText.value;
        task.description = editedText.value;
    }
}

function changeTaskStatus(checkBox: any, task: todoTask) {
    if (checkBox.checked) {
        remainingTasks -= 1;
    } else {
        remainingTasks += 1;
    }
    task.checked = !task.checked;
    totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();
}

function addTask(task: string) {
    inputTask.value = "";
    if (task === "") {
        alert("please write something before creating a task!")
    }
    else {
        remainingTasks += 1;
        totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();
        createTask(task);
    }
}

function createTask(task: string) {
    const todoItem = document.createElement("div");
    todoItem.classList.add("liDiv");
    const todoValue = document.createElement("li");
    todoValue.textContent = task;
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");

    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    deleteButton.textContent = "🗑";
    editButton.textContent = "Edit";

    taskList.appendChild(todoItem);
    todoItem.appendChild(checkBox);
    todoItem.appendChild(todoValue);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);

    const taskItem: todoTask = {
        description: task,
        checked: false
    };

    checkBox.addEventListener('change', () => changeTaskStatus(checkBox, taskItem))
    deleteButton.addEventListener("click", () => deleteTask(todoItem, checkBox, taskItem));
    editButton.addEventListener("click", () => editTask(todoItem, todoValue, taskItem));

    listOfTasks.push(taskItem);
    window.localStorage.setItem('tasks', JSON.stringify(listOfTasks));
    remainingTasks = listOfTasks.length;
}

window.addEventListener("load", loadPage);
