const todosController = (function() {
    
    function addTask(usersNewTaskTitle) {
        return usersNewTaskTitle;
    }

    function selectedTodoProperty() {
        let selectedTask = prompt('Do you want to, 1. edit the title of the task');
        let text;
        if (selectedTask == '1') {
            text = updateTodoTitle();
        } else {
            text = 'Invalid input from user'
        }
        return text;
    }

    function updateTodoTitle() {
        let newTitle = prompt('Type your desired todo title here');
        return newTitle
    }

    return {
        addTask,
        selectedTodoProperty,
        updateTodoTitle,
    }

})();

export default todosController;