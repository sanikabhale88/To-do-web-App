const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskCategory = document.getElementById("taskCategory");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];


addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const date = taskDate.value;
  const category = taskCategory.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const newTask = {
    id: Date.now(),
    name: taskText,
    date: date || "No Date",
    category: category || "General",
    completed: false,
  };

  tasks.push(newTask);
  displayTasks(tasks);
  taskInput.value = "";
  taskDate.value = "";
  taskCategory.value = "";
});

function displayTasks(taskListArray) {
  taskList.innerHTML = "";

  taskListArray.forEach((task) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item");
    if (task.completed) taskElement.classList.add("completed");

    taskElement.innerHTML = `
      <span>${task.name} (${task.category}) - ${task.date}</span>
      <div>
        <input type="checkbox" class="complete-checkbox" ${
          task.completed ? "checked" : ""
        } onchange="toggleTaskCompletion(${task.id})" />
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });

  updateTaskEvents(); 
}


function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
    return task;
  });
  displayTasks(tasks);
}


function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  displayTasks(tasks);
}


function updateTaskEvents() {
  document.querySelectorAll(".complete-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const taskId = parseInt(
        e.target.closest(".task-item").querySelector("input").dataset.taskId
      );
      toggleTaskCompletion(taskId);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const taskId = parseInt(
        e.target.closest(".task-item").querySelector("input").dataset.taskId
      );
      deleteTask(taskId);
    });
  });
}


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


function filterTasks(category) {
  if (category === "All") {
    displayTasks(tasks);
  } else {
    const filteredTasks = tasks.filter((task) => task.category === category);
    displayTasks(filteredTasks);
  }
}
