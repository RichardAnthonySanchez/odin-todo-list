const TodosView = (function () {
  function viewCurrentTodos(currentTodos) {
    const activeTasksContainer = document.getElementById("active-tasks");
    activeTasksContainer.innerHTML = "";

    for (
      let eachFilteredTodo = 0;
      eachFilteredTodo < currentTodos.length;
      eachFilteredTodo++
    ) {
      let task = currentTodos[eachFilteredTodo];
      let taskContainer = document.createElement("div");
      let checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.setAttribute("class", "task-checkbox");
      let taskContent = document.createElement("p");
      taskContent.setAttribute("class", "task-content");
      taskContainer.setAttribute("class", "task");
      taskContent.innerHTML = task.title;
      taskContainer.appendChild(checkBox);
      taskContainer.appendChild(taskContent);
      activeTasksContainer.appendChild(taskContainer);
    }
  }

  function viewCompletedTodos(completedTasks) {
    const completedTasksContainer = document.getElementById("completed-tasks");
    completedTasksContainer.innerHTML = "";

    for (
      let eachFilteredTodo = 0;
      eachFilteredTodo < completedTasks.length;
      eachFilteredTodo++
    ) {
      let task = completedTasks[eachFilteredTodo];
      let taskContainer = document.createElement("div");
      let checkBox = document.createElement("input");
      checkBox.setAttribute("type", "checkbox");
      checkBox.setAttribute("class", "task-checkbox");
      let taskContent = document.createElement("p");
      taskContent.setAttribute("class", "task-content");
      taskContainer.setAttribute("class", "task task-complete");
      taskContent.innerHTML = task.title;
      taskContainer.appendChild(checkBox);
      taskContainer.appendChild(taskContent);
      completedTasksContainer.appendChild(taskContainer);
    }
  }

  function viewSelectedTodoProperty(displayText) {
    console.log(displayText);
  }

  function viewSelectedTodoTitle(todoTitle) {
    const titleContainer = document.querySelector(".todo-title");

    const titleElement = document.getElementById("task-title");
    titleElement.innerHTML = "";
    titleElement.innerHTML = todoTitle;

    titleContainer.appendChild(titleElement);
  }

  function viewSelectedTodoDescription(todoDescription) {
    const noteContainer = document.querySelector(".note");

    const descriptionElement = document.getElementById("task-note");
    descriptionElement.innerHTML = "";
    descriptionElement.innerHTML = todoDescription;

    noteContainer.appendChild(descriptionElement);
  }

  function viewSelectedTodoPriority(todoPriority) {
    const addImportantContainer = document.getElementById("add-important");

    const priorityContentElement = document.getElementById("important-content");
    priorityContentElement.innerHTML = "";
    priorityContentElement.innerHTML = todoPriority;

    addImportantContainer.appendChild(priorityContentElement);
  }

  function viewSelectedTodoDueDate(todoDueDate) {
    if (todoDueDate === null) {
      todoDueDate = "add a due date";
    } else {
      // keep due date the same
    }

    const addDueContainer = document.getElementById("add-due");

    const dueDateElement = document.getElementById("due-content");
    dueDateElement.innerHTML = "";
    dueDateElement.innerHTML = todoDueDate;

    addDueContainer.appendChild(dueDateElement);
  }

  function viewSelectedTodosProject(todosProject) {
    const projectContentElement = document.getElementById("project-content");

    if (todosProject) {
      projectContentElement.innerHTML = "";
      projectContentElement.innerHTML = todosProject;
    } else {
      // else have default text like 'add todo to a project'
      projectContentElement.innerHTML = "";
      projectContentElement.innerHTML = "add this todo to a project";
    }
  }

  function viewTodoPriorityOptions() {
    let importantMenuContainer = document.getElementById("important-menu");

    if (importantMenuContainer.classList.contains("hidden")) {
      importantMenuContainer.classList.remove("hidden");
    } else {
      importantMenuContainer.classList.add("hidden");
    }

    const lowContainer = document.querySelector(".menu-option.low");
    const mediumContainer = document.querySelector(".menu-option.medium");
    const highContainer = document.querySelector(".menu-option.high");

    lowContainer.innerHTML = "";
    mediumContainer.innerHTML = "";
    highContainer.innerHTML = "";

    const lowContent = document.createElement("span");
    lowContent.innerHTML = "low";
    lowContainer.appendChild(lowContent);

    const mediumContent = document.createElement("span");
    mediumContent.innerHTML = "medium";
    mediumContainer.appendChild(mediumContent);

    const highContent = document.createElement("span");
    highContent.innerHTML = "high";
    highContainer.appendChild(highContent);

    importantMenuContainer.appendChild(lowContainer);
    importantMenuContainer.appendChild(mediumContainer);
    importantMenuContainer.appendChild(highContainer);
  }

  function viewDueDateOptions() {
    const dueMenuContainer = document.getElementById("due-menu");

    if (dueMenuContainer.classList.contains("hidden")) {
      dueMenuContainer.classList.remove("hidden");
    } else {
      dueMenuContainer.classList.add("hidden");
    }

    const tomorrowContainer = document.querySelector(".menu-option.tomorrow");
    const weekContainer = document.querySelector(".menu-option.week");
    const monthContainer = document.querySelector(".menu-option.month");

    tomorrowContainer.innerHTML = "";
    weekContainer.innerHTML = "";
    monthContainer.innerHTML = "";

    const tomorrowContent = document.createElement("span");
    tomorrowContent.innerHTML = "Tomorrow";
    tomorrowContainer.appendChild(tomorrowContent);

    const weekContent = document.createElement("span");
    weekContent.innerHTML = "Next Week";
    weekContainer.appendChild(weekContent);

    const monthContent = document.createElement("span");
    monthContent.innerHTML = "Next Month";
    monthContainer.appendChild(monthContent);

    dueMenuContainer.appendChild(tomorrowContainer);
    dueMenuContainer.appendChild(weekContainer);
    dueMenuContainer.appendChild(monthContainer);
  }

  function viewSelectableProjects(projects) {
    let projectMenuContainer = document.getElementById("project-menu");
    projectMenuContainer.innerHTML = "";

    if (projectMenuContainer.classList.contains("hidden")) {
      projectMenuContainer.classList.remove("hidden");
    } else {
      projectMenuContainer.classList.add("hidden");
    }

    for (let eachProject = 0; eachProject < projects.length; eachProject++) {
      let menuOptionContainer = document.createElement("div");
      menuOptionContainer.setAttribute("class", "menu-option" + " project");

      let projectSpanElement = document.createElement("span");
      let currentProjectName = projects[eachProject].name;
      projectSpanElement.setAttribute("class", currentProjectName);

      projectSpanElement.innerHTML = currentProjectName;
      menuOptionContainer.appendChild(projectSpanElement);
      projectMenuContainer.appendChild(menuOptionContainer);
    }
  }

  function viewDefaultDataButton() {
    const containerElement = document.getElementById("container");

    const buttonElement = document.createElement("button");
    buttonElement.setAttribute("id", "refresh-todos");

    buttonElement.innerHTML = "refresh todos to default";

    containerElement.appendChild(buttonElement);
  }

  return {
    viewCurrentTodos,
    viewCompletedTodos,
    viewSelectedTodoProperty,
    viewSelectedTodoTitle,
    viewSelectedTodoDescription,
    viewSelectedTodoPriority,
    viewTodoPriorityOptions,
    viewSelectedTodoDueDate,
    viewDueDateOptions,
    viewSelectedTodosProject,
    viewSelectableProjects,
    viewDefaultDataButton,
  };
})();

export default TodosView;
