document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText, false);
    saveTask(taskText, false);

    input.value = "";
}

function createTaskElement(taskText, isCompleted) {
    let li = document.createElement("li");
    li.innerHTML = `
        ${taskText}
        <button class="edit" onclick="editTask(this)">✏</button>
        <button class="complete" onclick="toggleComplete(this)">✔</button>
        <button class="delete" onclick="deleteTask(this)">❌</button>
    `;

    if (isCompleted) {
        document.getElementById("completedList").appendChild(li);
    } else {
        document.getElementById("pendingList").appendChild(li);
    }
}

// Delete task
function deleteTask(button) {
    let li = button.parentElement;
    removeTask(li.firstChild.textContent.trim());
    li.remove();
}

// Edit task
function editTask(button) {
    let li = button.parentElement;
    let newTask = prompt("Edit Task:", li.firstChild.textContent.trim());
    if (newTask) {
        updateTask(li.firstChild.textContent.trim(), newTask);
        li.firstChild.textContent = newTask;
    }
}

// Toggle Complete / Pending
function toggleComplete(button) {
    let li = button.parentElement;
    let isCompleted = li.parentElement.id === "pendingList";

    if (isCompleted) {
        document.getElementById("completedList").appendChild(li);
    } else {
        document.getElementById("pendingList").appendChild(li);
    }

    updateTask(li.firstChild.textContent.trim(), li.firstChild.textContent.trim(), isCompleted);
}

// LocalStorage Functions
function saveTask(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: isCompleted });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(oldText, newText, completed = false) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.text === oldText) {
            return { text: newText, completed: completed };
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}