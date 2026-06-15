let taskInput = document.getElementById("taskInput");
let dueDate = document.getElementById("dueDate");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let taskCounter = document.getElementById("taskCounter");
let searchInput = document.getElementById("searchInput");
let themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
    taskCounter.textContent = tasks.length;
}

function renderTasks() {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        let li = document.createElement("li");

        if (tasks[i].completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.6";
        }

        li.innerHTML = `
            <div class="task-info">
                <strong>${tasks[i].text}</strong>
                <span class="task-date">${tasks[i].date || "No Date"}</span>
            </div>

            <div>
                <button class="complete-btn" onclick="toggleComplete(${i})">
                    ${tasks[i].completed ? "Undo" : "✓"}
                </button>

                <button class="edit-btn" onclick="editTask(${i})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteTask(${i})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    }

    updateCounter();
    saveTasks();
}

addBtn.onclick = function () {

    let text = taskInput.value.trim();
    let date = dueDate.value;

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        text: text,
        date: date,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";
    dueDate.value = "";

    renderTasks();
};

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {

    let newText = prompt("Edit Task", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        renderTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

searchInput.onkeyup = function () {

    let filter = searchInput.value.toLowerCase();

    let items = taskList.getElementsByTagName("li");

    for (let i = 0; i < items.length; i++) {

        let text = items[i].textContent.toLowerCase();

        if (text.indexOf(filter) > -1) {
            items[i].style.display = "flex";
        } else {
            items[i].style.display = "none";
        }
    }
};

themeBtn.onclick = function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.innerHTML = "☀️ Light Mode";
    } else {
        themeBtn.innerHTML = "🌙 Dark Mode";
    }
};

renderTasks();