document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);
    saveTask(taskText);

    input.value = "";
}

function createTaskElement(taskText) {
    let li = document.createElement("li");

    li.innerHTML = `
        ${taskText}
        <button onclick="completeTask(this)">✔</button>
        <button onclick="deleteTask(this)">❌</button>
    `;

    document.getElementById("taskList").appendChild(li);
}

function deleteTask(button) {
    let li = button.parentElement;
    removeTask(li.firstChild.textContent.trim());
    li.remove();
}

function completeTask(button) {
    button.parentElement.style.textDecoration = "line-through";
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}