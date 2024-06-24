import todoFilters from "./model-todos";
import todoViewer from "./view-todos";
import todosController from "./controller-todos";
import projectInterface from "./interface-projects";

const todosInterface = (function() {

    function displayCurrentTasks(){
        let currentTasks = todoFilters.currentTasks();
        todoViewer.viewCurrentTodos(currentTasks.filterOutCompletedTodos);
    }

    function displayCompletedTasks() {
        let completedTasks = todoFilters.getCompletedTasks();
        todoViewer.viewCompletedTodos(completedTasks);
    }

    function addTaskInterface(usersNewTaskTitle) {
        todosController.addTask(usersNewTaskTitle);
        let newTask = todoFilters.createTaskObject(usersNewTaskTitle);
        todoFilters.addTodo(newTask);
        const newTasksId = newTask.id;
        projectInterface.updateProjectTodosInterface(newTasksId);
        displayCurrentTasks();
    }

    function checkForStoredTodosInterface(defaultTodos) {
        todoFilters.checkForStoredTodos(defaultTodos);
    }

    function refreshDefaultTodosInterface(defaultTodos) {
        todoFilters.refreshDefaultTodos(defaultTodos);
        displayCurrentTasks();
    }

    function switchTaskCompletionStatusInterface(todo) {
        let updatedTodo = todoFilters.switchTaskCompletionStatus(todo);
        todoFilters.updateTodo(updatedTodo);
        displayCurrentTasks();
        displayCompletedTasks();
    }

    function findSelectedTodoInterface(todoContent) {
        let todoObject = todoFilters.findSelectedTodo(todoContent);
        return todoObject;
    }

    function selectedTodoPropertyInterface(todo) {
        let todoPropertyAndValue = todosController.selectedTodoProperty();
        let todoProperty = todoPropertyAndValue.selectedProperty;
        let newPropertyValue = todoPropertyAndValue.propertyContent;
        let updatedTodo;

        if (todoProperty == '1') {
            updatedTodo = todoFilters.updateTodoTitle(todo, newPropertyValue);
        } else if (todoProperty == '2') {
            updatedTodo = todoFilters.updateTodoPriority(todo, newPropertyValue);
        } else if (todoProperty == '3') {
            updatedTodo = todoFilters.updateTodoDescription(todo, newPropertyValue);
        } else if (todoProperty == '4') {
                updatedTodo = todoFilters.updateTodoDueDate(todo, newPropertyValue);
        } else {
            console.log('selected todo property is invalid')
        }

        todoFilters.updateTodo(updatedTodo);
        displayCurrentTasks();
        displayCompletedTasks();
        todoViewer.viewSelectedTodoProperty(newPropertyValue);
    }

    function updateTodoDescription(todo, newPropertyValue) {
        const updatedTodo = todoFilters.updateTodoDescription(todo, newPropertyValue);
        todoFilters.updateTodo(updatedTodo);
        todoViewer.viewSelectedTodoProperty(newPropertyValue);
    }

    function getTodoFromIdInterface(selectedTodoIndex) {
        const todos = todoFilters.getTodos();
        const todoObject = todoFilters.getTodoFromId(selectedTodoIndex, todos);
        return  todoObject;
    }

    function getTodoTitleInterface(todoObject) {
        const title = todoObject.title;
        return title;
    }

    function viewSelectableProjectsInterface() {
        const projects = projectInterface.getProjectsInterface();
        todoViewer.viewSelectableProjects(projects);
    }

    function displaySelectedTitleInterface(todoTitle) {
        todoViewer.viewSelectedTodoTitle(todoTitle)
    }

    function displaySelectedDescriptionInterface(todoDescription) {
        todoViewer.viewSelectedTodoDescription(todoDescription);
    }

    function displaySelectedPriorityInterface(todoPriority) {
        todoViewer.viewSelectedTodoPriority(todoPriority)
    }

    function displaySelectedDueDateInterface(todoDueDate) {
        todoViewer.viewSelectedTodoDueDate(todoDueDate);
    }

    function displaySelectedTodosProjectInterface(todoProject) {
        todoViewer.viewSelectedTodosProject(todoProject)
    }

    function viewTodoPriorityOptionsInterface() {
        todoViewer.viewTodoPriorityOptions();
    }

    function viewDueDateOptionsInterface() {
        todoViewer.viewDueDateOptions();
    }

    function changeTodoPropertyInterface(newPriorityValue) { // this method should  be named priority not property
        const state = todoFilters.getState();
        const selectedTodoIndex = state.selectedTodo;
        const todos = todoFilters.getTodos();
        const todoObject = todoFilters.getTodoFromId(selectedTodoIndex, todos);
        const updatedTodo = todoFilters.updateTodoPriority(todoObject, newPriorityValue);

        todoFilters.updateTodo(updatedTodo);
        
        displayCurrentTasks();
        displayCompletedTasks();
    }

    function changeTodoDueDateInterface(dueDateIndex) {
        const formattedDueDate = todosController.updateTodoDueDate(dueDateIndex);
        todoFilters.updateSelectedTodoDueDate(formattedDueDate);
        displaySelectedDueDateInterface(formattedDueDate);
    }

    return {
        displayCurrentTasks,
        displayCompletedTasks,
        addTaskInterface,
        checkForStoredTodosInterface,
        refreshDefaultTodosInterface,
        switchTaskCompletionStatusInterface,
        findSelectedTodoInterface,
        selectedTodoPropertyInterface,
        getTodoTitleInterface,
        displaySelectedTitleInterface,
        getTodoFromIdInterface,
        updateTodoDescription,
        displaySelectedDescriptionInterface,
        displaySelectedPriorityInterface,
        viewTodoPriorityOptionsInterface,
        changeTodoPropertyInterface,
        displaySelectedDueDateInterface,
        viewDueDateOptionsInterface,
        changeTodoDueDateInterface,
        displaySelectedTodosProjectInterface,
        viewSelectableProjectsInterface,
    }
})()

export default todosInterface;