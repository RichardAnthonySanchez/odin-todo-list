import todoFilters from "./model-todos";
import todoViewer from "./view-todos";

const todosInterface = (function(todos) {

    function displayCurrentTasks(todos){
        let currentTasks = todoFilters.currentTasks(todos);
        todoViewer.viewCurrentTodos(currentTasks);
    }

    return {
        displayCurrentTasks,
    }
})()

export default todosInterface;