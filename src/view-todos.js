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
    }

    function viewSelectedTodoProperty(displayText) {
        console.log(displayText);
    }

    function viewSelectedTodoTitle(todoTitle) {
        const titleContainer = document.querySelector('.todo-title')

        const titleElement = document.getElementById('task-title')
        titleElement.innerHTML = '';
        titleElement.innerHTML = todoTitle;

        titleContainer.appendChild(titleElement);
    }

    function viewSelectedTodoDescription(todoDescription) {
        const noteContainer = document.querySelector('.note');

        const descriptionElement = document.getElementById('task-note');
        descriptionElement.innerHTML = '';
        descriptionElement.innerHTML = todoDescription;

        noteContainer.appendChild(descriptionElement);
    }

    function viewSelectedTodoPriority(todoPriority) {
        const addImportantContainer = document.getElementById('add-important')

        const priorityContentElement = document.getElementById('important-content');
        priorityContentElement.innerHTML = '';
        priorityContentElement.innerHTML = todoPriority;

        addImportantContainer.appendChild(priorityContentElement);
    }
    
    return {
        viewCurrentTodos,
        viewCompletedTodos,
        viewSelectedTodoProperty,
        viewSelectedTodoTitle,
        viewSelectedTodoDescription,
        viewSelectedTodoPriority,
    }
    
})()

export default todoViewer;