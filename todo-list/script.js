function loadPage() {
    const addNewTasks = document.createElement("div");
    document.body.appendChild(addNewTasks);
    const inputTask = document.createElement("input");
    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "+";
    addNewTasks.appendChild(inputTask);
    addNewTasks.appendChild(addTaskButton);
    const taskList = document.createElement("ul");
    document.body.appendChild(taskList);

    addTaskButton.addEventListener("click", () => addTask(inputTask.value));
}

function addTask(task) {
    console.log(task);
 if (task === "") {
     alert("please write something before creating a task!")
 }
 else {
     const todoItem = document.createElement("li");
 }
}

window.addEventListener("load", loadPage);
