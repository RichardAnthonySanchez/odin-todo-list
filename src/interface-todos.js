import todoFilters from "./model-todos";
import todoViewer from "./view-todos";

const todosInterface = (function(todos) {

    function displayCurrentTasks(todos){
        let currentTasks = todoFilters.currentTasks(todos);
        todoViewer.viewCurrentTodos(currentTasks);
    }

    function displayCompletedTasks(todos) {
        let completedTasks = todoFilters.getCompletedTasks(todos);
        todoViewer.viewCompletedTodos(completedTasks);
    }

    return {
        displayCurrentTasks,
        displayCompletedTasks,
    }
})()

export default todosInterface;