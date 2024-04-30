import todoFilters from "./model-todos";
import todoViewer from "./view-todos";
import todosController from "./controller-todos";

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

    return {
        displayCurrentTasks,
        displayCompletedTasks,
        addTaskInterface,
        checkForStoredTodosInterface,
        refreshDefaultTodosInterface,
        switchTaskCompletionStatusInterface,
        findSelectedTodoInterface,
    }
})()

export default todosInterface;