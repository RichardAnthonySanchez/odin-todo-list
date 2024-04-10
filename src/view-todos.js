import _ from 'lodash';

export default function viewTodos(todos) {
    let projectArr = [];
    for (let i = 0; i < todos.length; i++) {
        let eachTodo = todos[i];
        let projectOfTodo = eachTodo.project;
        projectArr.push(projectOfTodo);
    }
    let uniqueProjects = _.uniq(projectArr);
/*
    const list = document.createElement('ul');
    for (let parseEachProject = 0; parseEachProject < uniqueProjects.length; parseEachProject++) {
        let eachProjectContainer = document.createElement('li');
        eachProjectContainer.innerHTML = uniqueProjects[parseEachProject];
        list.appendChild(eachProjectContainer);
    }
    const body = document.querySelector('body');
    body.appendChild(list);
    */

    const activeTasksContainer = document.getElementById('active-tasks');

    const filteredTodos = _.filter(todos, { 'project': 'Today'});
    for (let eachFilteredTodo = 0; eachFilteredTodo < filteredTodos.length; eachFilteredTodo++) {
        let task = filteredTodos[eachFilteredTodo];
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