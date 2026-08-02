document.addEventListener("DOMContentLoaded", loadTasks);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    input.value = "";

    saveTasks();
    loadTasks();
}

function loadTasks() {

    const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span class="task-text">${task.text}</span>

            <div class="buttons">
                <button class="edit" onclick="editTask(${task.id})">✏</button>

                <button class="complete" onclick="toggleTask(${task.id})">
                    ${task.completed ? "↩" : "✔"}
                </button>

                <button class="delete" onclick="deleteTask(${task.id})">❌</button>
            </div>
        `;

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }

    });

}

function editTask(id) {

    const task = tasks.find(t => t.id === id);

    const updated = prompt("Edit Task", task.text);

    if (updated === null) return;

    if (updated.trim() === "") {
        alert("Task cannot be empty.");
        return;
    }

    task.text = updated.trim();

    saveTasks();

    loadTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    loadTasks();
}

function toggleTask(id) {

    const task = tasks.find(task => task.id === id);

    task.completed = !task.completed;

    saveTasks();

    loadTasks();
}