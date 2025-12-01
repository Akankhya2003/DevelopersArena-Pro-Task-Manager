function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const taskDate = document.getElementById("taskDate").value;
    const taskTime = document.getElementById("taskTime").value;

    if (taskInput === "") {
        alert("Enter a task name");
        return;
    }

    if (taskDate === "") {
        alert("Select a due date");
        return;
    }

    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.className = "task";

    let dateDisplay = taskDate;
    if (taskTime !== "") {
        dateDisplay += ` at ${taskTime}`;
    }

    li.innerHTML = `
        <div class="task-details">
            <span class="task-text">${taskInput}</span>
            <span class="task-date">Due: ${dateDisplay}</span>
        </div>

        <div class="buttons">
            <button class="complete-btn" onclick="markComplete(this)">✔</button>
            <button class="delete-btn" onclick="deleteTask(this)">✖</button>
        </div>
    `;

    taskList.appendChild(li);

    // Set reminder if time is provided
    if (taskTime !== "") {
        setReminder(taskInput, taskDate, taskTime);
    }

    // Clear inputs
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";
}

function markComplete(button) {
    const task = button.parentElement.parentElement;
    task.classList.toggle("completed");
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
}

function setReminder(taskName, date, time) {
    const taskDateTime = new Date(`${date}T${time}:00`);
    const now = new Date();

    const diff = taskDateTime - now;

    if (diff > 0) {
        setTimeout(() => {
            alert(`⏰ Reminder: ${taskName}`);
        }, diff);
    }
}
