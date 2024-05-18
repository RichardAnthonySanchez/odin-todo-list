import _ from 'lodash';

const todoViewer = (function(todos) {

    function viewCurrentTodos(currentTodos) {
        const activeTasksContainer = document.getElementById('active-tasks');
        activeTasksContainer.innerHTML = '';

        for (let eachFilteredTodo = 0; eachFilteredTodo < currentTodos.length; eachFilteredTodo++) {
            let task = currentTodos[eachFilteredTodo];
            let taskContainer = document.createElement('div');
            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('class', 'task-checkbox');
            let taskContent = document.createElement('p');
            taskContent.setAttribute('class', 'task-content');
            taskContainer.setAttribute('class', 'task');
            taskContent.innerHTML = task.title;
            taskContainer.appendChild(checkBox);
            taskContainer.appendChild(taskContent);
            activeTasksContainer.appendChild(taskContainer);
        } 
    } 

    function viewCompletedTodos(completedTasks) {
        /*
        const completedTasksContainer = document.getElementById('completed-tasks');
        completedTasksContainer.innerHTML = '';

        for (let eachFilteredTodo = 0; eachFilteredTodo < completedTasks.length; eachFilteredTodo++) {
            let task = completedTasks[eachFilteredTodo];
            let taskContainer = document.createElement('div');
            let checkBox = document.createElement('input');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('class', 'task-checkbox');
            let taskContent = document.createElement('p');
            taskContent.setAttribute('class', 'task-content');
            taskContainer.setAttribute('class', 'task task-complete');
            taskContent.innerHTML = task.title;
            taskContainer.appendChild(checkBox);
            taskContainer.appendChild(taskContent);
            completedTasksContainer.appendChild(taskContainer);
        } 
        */
    }

    function viewSelectedTodoProperty(displayText) {
        console.log(displayText);
    }
    
    return {
        viewCurrentTodos,
        viewCompletedTodos,
        viewSelectedTodoProperty,
    }
    
})()

export default todoViewer;