import _ from "lodash";
import InterfaceState from "../interfaces/interface-state"; // i think we can process state information in the todos interface NOT here

const TodosModel = (function () {
  function getState() {
    let state = InterfaceState.getStateInterface();
    return state;
  }

  function getCurrentProjectName() {
    const state = getState();
    const projects = getProjects();
    let currentProjectName;

    if (!projects) {
      throw new Error("cannot find projects");
    } else {
      if (!state.selectedProject) {
        throw new Error("cannot find the current state of the application");
      } else {
        let selectedProjectIndex = getStateIndex(projects);
        let currentProjectObject = getProjectFromId(
          selectedProjectIndex,
          projects,
        );
        currentProjectName = currentProjectObject.name;
      }
    }

    return currentProjectName;
  }

  function getStateIndex() {
    let state = getState();
    let selectedProjectIndex;
    if (!state) {
      throw new Error("error unreadable state");
    } else {
      selectedProjectIndex = state.selectedProject;
    }
    return selectedProjectIndex;
  }

  function getProjectFromId(selectedProjectIndex, projects) {
    //update this so that if there are no projects, we can prevent a crash
    let currentProjectObject = _.find(projects, { id: selectedProjectIndex });

    if (!currentProjectObject) {
      const firstProjectId = projects[0].id;
      currentProjectObject = _.find(projects, { id: firstProjectId });
    } else {
      // keep the original value of the project object
    }

    return currentProjectObject;
  }

  function getTodoFromId(selectedTodoIndex, todos) {
    let currentTodoObject = _.find(todos, { id: selectedTodoIndex });
    return currentTodoObject;
  }

  function getTodos() {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  }

  function getProjects() {
    const storedProjects = localStorage.getItem("projects");
    let projects;
    if (storedProjects) {
      try {
        projects = JSON.parse(storedProjects);
      } catch (error) {
        projects = [];
        console.log("get projects recived the following error: " + error);
      }
    } else {
      projects = [];
    }
    return projects;
  }

  function getCurrentProject() {
    const projects = getProjects();
    let currentProjectName = getCurrentProjectName();
    const currentProjectObject = _.find(projects, { name: currentProjectName });

    if (!currentProjectObject) {
      throw new Error("Project not found.");
    } else {
      return currentProjectObject;
    }
  }

  function getCurrentProjectIds(currentProject) {
    const currentTodoIds = currentProject.todos;
    return currentTodoIds;
  }

  function filterCurrentTodos(currentTodoIds, todos) {
    const currentTodos = _.filter(todos, (todo) => {
      return currentTodoIds.includes(todo.id);
    });
    return currentTodos;
  }

  function removeCompletedTodosFromCurrentProject(currentTodos) {
    const activeTodos = _.filter(currentTodos, (todo) => !todo.completed);
    return activeTodos;
  }

  function currentTasks() {
    const todos = getTodos();
    let currentProject = getCurrentProject();
    let currentTodoIds = getCurrentProjectIds(currentProject);
    let currentTodos = filterCurrentTodos(currentTodoIds, todos);
    let activeTodos = removeCompletedTodosFromCurrentProject(currentTodos);

    return {
      filterCurrentTodos: currentTodos,
      filterOutCompletedTodos: activeTodos,
    };
  }

  function getCompletedTasks() {
    let currentTasksResult = currentTasks();
    const completedTasks = _.filter(currentTasksResult.filterCurrentTodos, {
      completed: true,
    });
    return completedTasks;
  }

  function createTaskObject(taskTitle) {
    const todos = getTodos();
    return {
      title: taskTitle,
      id: `${todos.length + 1}`,
      description: "",
      due_date: "",
      priority: "",
      completed: false,
    };
  }

  //add todo's index to selected project's todos property

  function clearTodos() {
    localStorage.removeItem("todos");
    console.log("Todos cleared from local storage");
  }

  function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("todos stored successfully");
  }

  function checkForStoredTodos(defaultTodos) {
    let storedTodos = localStorage.getItem("todos");

    if (storedTodos !== null) {
      console.log("Todos are already in local storage", storedTodos);
    } else {
      saveTodos(defaultTodos);
    }
  }

  function refreshDefaultTodos(defaultTodos) {
    clearTodos();
    checkForStoredTodos(defaultTodos);
  }

  function addTodo(newTodo) {
    const todos = getTodos();

    todos.push(newTodo);

    saveTodos(todos);
  }

  function removeTodo(selectedTodo) {
    const todos = getTodos();

    const index = todos.findIndex((todo) => todo.id === selectedTodo);

    if (index !== -1) {
      todos.splice(index, 1);
    }

    saveTodos(todos);
  }

  function updateTodo(updatedTodo) {
    let todos = getTodos();
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = updatedTodo;
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      console.log("Todo not found");
    }
  }

  function switchTaskCompletionStatus(todo) {
    if (todo.completed) {
      todo.completed = false;
    } else {
      todo.completed = true;
    }
    return todo;
  }

  function findSelectedTodo(todoContent) {
    const todos = getTodos();
    const todoObject = todos.find((todo) => todo.title === todoContent);
    return todoObject;
  }

  function updateTodoTitle(todo, newTodoTitle) {
    todo.title = newTodoTitle;
    return todo;
  }

  function updateTodoPriority(todo, newTodoPriority) {
    todo.priority = newTodoPriority;
    return todo;
  }

  function updateTodoDescription(todo, newTodoDescription) {
    todo.description = newTodoDescription;
    return todo;
  }

  function updateTodoDueDate(todo, newTodoDueDate) {
    todo.due_date = newTodoDueDate;
    return todo;
  }

  function updateSelectedTodoDueDate(formattedDueDate) {
    const todos = getTodos();
    const state = getState();
    const todoId = state.selectedTodo;
    const todo = getTodoFromId(todoId, todos);
    const updatedTodo = updateTodoDueDate(todo, formattedDueDate);
    updateTodo(updatedTodo);
  }

  return {
    getProjects,
    currentTasks,
    getCompletedTasks,
    createTaskObject,
    saveTodos,
    checkForStoredTodos,
    addTodo,
    refreshDefaultTodos,
    switchTaskCompletionStatus,
    findSelectedTodo,
    updateTodo,
    updateTodoTitle,
    updateTodoPriority,
    updateTodoDescription,
    updateTodoDueDate,
    getTodoFromId,
    getTodos,
    getState,
    updateSelectedTodoDueDate,
    removeTodo,
  };
})();

export default TodosModel;
