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

    function editTodoTitleInterface() {
        let newTitle = todosController.updateTodoTitle();
        return newTitle
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
        editTodoTitleInterface,
    }
})()

export default todosInterface;