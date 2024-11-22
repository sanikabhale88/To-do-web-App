const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");
const taskPriority = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const date = taskDate.value;
  const category = taskCategory.value;
  const priority = taskPriority.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const newTask = {
    id: Date.now(),
    name: taskText,
    date: date || "No Date",
    category: category || "General",
    priority: priority || "medium", // Default priority to medium if not specified
    completed: false,
  };

  tasks.push(newTask);
  displayTasks(tasks);
  taskInput.value = "";
  taskDate.value = "";
  taskCategory.value = "General";  // Reset category dropdown
  taskPriority.value = "medium";  // Reset priority dropdown
});

// Function to display tasks
function displayTasks(taskListArray) {
  taskList.innerHTML = "";

  // Sort tasks by priority before displaying them
  taskListArray.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  taskListArray.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item");
    if (task.completed) taskElement.classList.add("completed");

    let priorityColor;
    switch (task.priority) {
      case "high":
        priorityColor = "red";
        break;
      case "medium":
        priorityColor = "yellow";
        break;
      case "low":
        priorityColor = "green";
        break;
      default:
        priorityColor = "grey";
    }

    taskElement.innerHTML = `
      <span style="color: ${priorityColor};">${task.name} (${task.category}) - ${task.date} - Priority: ${task.priority}</span>
      <div>
        <input type="checkbox" class="complete-checkbox" data-task-id="${task.id}" ${
      task.completed ? "checked" : ""
    } />
        <button class="delete-btn" data-task-id="${task.id}">Delete</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });

  updateTaskEvents();
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
    return task;
  });
  displayTasks(tasks);
}

// Function to delete task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  displayTasks(tasks);
}

// Function to update events for checkboxes and delete buttons
function updateTaskEvents() {
  document.querySelectorAll(".complete-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const taskId = e.target.getAttribute("data-task-id");
      toggleTaskCompletion(Number(taskId));
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const taskId = e.target.getAttribute("data-task-id");
      deleteTask(Number(taskId));
    });
  });
}

// Handle filter button clicks
filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    let filteredTasks;

    switch (filter) {
      case "all":
        filteredTasks = tasks;
        break;
      case "pending":
        filteredTasks = tasks.filter((task) => !task.completed);
        break;
      case "completed":
        filteredTasks = tasks.filter((task) => task.completed);
        break;
      default:
        filteredTasks = tasks;
    }
    displayTasks(filteredTasks);
  });
});

// Handle category filtering
function filterTasks(category) {
  const filteredTasks = category === "All" ? tasks : tasks.filter((task) => task.category === category);
  displayTasks(filteredTasks);
}
