const todosController = (function() {
    
    function addTask(usersNewTaskTitle) {
        return usersNewTaskTitle;
    }

    function selectedTodoProperty() {
        let selectedTask = prompt('Do you want to, 1. edit the title of the task');
        let text;
        if (selectedTask === '1') {
            text = 'user wants to edit task title';
        } else {
            text = 'invalid input';
        }
        return text;
    }

    return {
        addTask,
        selectedTodoProperty,
    }

})();

export default todosController;