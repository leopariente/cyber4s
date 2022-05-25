const addNewTasks = document.createElement("div");
const inputTask = document.createElement("input");
inputTask.placeholder = "Add your new todo";
const addTaskButton = document.createElement("button");
const taskList = document.createElement("ul");
const totalTasks = document.createElement("p");

interface listItem {
    value: string | null;
    checked: boolean;
}

let listOfTasks: listItem[] = [];
let remainingTasks: number = 0;

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

function deleteTask(todoItem: any, listItem: listItem) {
    if (listItem.checked === false) {
    remainingTasks-=1;
    }
    todoItem.remove();
    totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();
}

function editTask(todoItem: any, listItem: listItem, valueToEdit: HTMLElement) {
    const editedText = document.createElement("input");
    const confirmEdit = document.createElement("button");
    confirmEdit.textContent = "Confirm";
    editedText.placeholder = "Enter your edited task here"
    todoItem.appendChild(editedText);
    todoItem.appendChild(confirmEdit);
    confirmEdit.addEventListener("click", () => confirmText(editedText, valueToEdit, todoItem))
    console.log(listItem);
}

function confirmText(editedText: HTMLInputElement, valueToEdit: HTMLElement, todoItem: HTMLElement) {
    if (editedText.textContent !== "") {
        valueToEdit.textContent = editedText.textContent;
    }
    editedText.type = "hidden";
    console.log(todoItem);
}

function changeTaskStatus(checkBox: any, listItem: listItem) {
    if (checkBox.checked) {
        remainingTasks-=1;
      } else {
          remainingTasks+=1;
      }
      totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();
      listItem.checked = !listItem.checked;
}

function addTask(task: any) {
    inputTask.value = "";
 if (task === "") {
     alert("please write something before creating a task!")
 }
 else {
     remainingTasks+=1;
     totalTasks.textContent = "remaining tasks: " + remainingTasks.toString();
     const todoItem = document.createElement("div");
     const todoValue = document.createElement("li");
     todoValue.textContent = task;
     const checkBox = document.createElement("input");
     checkBox.type = "checkbox";

     const deleteButton = document.createElement("button");
     const editButton = document.createElement("button");

     deleteButton.textContent = "Delete";
     editButton.textContent = "Edit";
     
     taskList.appendChild(todoItem);
     todoItem.appendChild(checkBox);
     todoItem.appendChild(todoValue);
     todoItem.appendChild(editButton);
     todoItem.appendChild(deleteButton);

     let listItem = {
         value: todoValue.textContent,
         checked: false
     }
     listOfTasks.push(listItem);
     console.log(listOfTasks);

     checkBox.addEventListener('change', () => changeTaskStatus(checkBox, listItem))
     deleteButton.addEventListener("click", () => deleteTask(todoItem, listItem));
     editButton.addEventListener("click", () => editTask(todoItem, listItem, todoValue));
 }

}

window.addEventListener("load", loadPage);
