import todoFilters from "./model-todos";
import todoViewer from "./view-todos";
import todosController from "./controller-todos";

const todosInterface = (function(todos) {

    function displayCurrentTasks(todos){
        let currentTasks = todoFilters.currentTasks(todos);
        todoViewer.viewCurrentTodos(currentTasks.filterOutCompletedTodos);
    }

    function displayCompletedTasks(todos) {
        let completedTasks = todoFilters.getCompletedTasks(todos);
        todoViewer.viewCompletedTodos(completedTasks);
    }

    function addTaskInterface(usersNewTaskTitle) {
        todosController.addTask(usersNewTaskTitle);
        let newTask = todoFilters.createTaskObject(usersNewTaskTitle);
        console.log(newTask);
        return newTask;
    }

    function checkForStoredTodos(defaultTodos) {
        todoFilters.checkForStoredTodos(defaultTodos);
    }

    return {
        displayCurrentTasks,
        displayCompletedTasks,
        addTaskInterface,
        checkForStoredTodos,
    }
})()

export default todosInterface;