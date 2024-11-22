
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");


addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const date = taskDate.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.className = "task-item pending";
  taskItem.innerHTML = `
    <span>${taskText} (${date || "No Date"})</span>
    <div>
      <input type="checkbox" class="complete-checkbox">
      <button class="delete-btn">Delete</button>
    </div>
  `;

  taskList.appendChild(taskItem);
  taskInput.value = "";
  taskDate.value = "";

  updateTaskEvents();
});

function updateTaskEvents() {
 
  document.querySelectorAll(".complete-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const taskItem = e.target.closest(".task-item");
      taskItem.classList.toggle("completed");
    });
  });


  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const taskItem = e.target.closest(".task-item");
      taskList.removeChild(taskItem);
    });
  });
}


filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;
    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach((task) => {
      switch (filter) {
        case "all":
          task.style.display = "flex";
          break;
        case "pending":
          task.style.display = task.classList.contains("completed") ? "none" : "flex";
          break;
        case "completed":
          task.style.display = task.classList.contains("completed") ? "flex" : "none";
          break;
      }
    });
  });
});
