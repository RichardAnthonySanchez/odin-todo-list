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
        taskContainer.setAttribute('class', 'task');
        taskContainer.innerHTML = task.title;
        activeTasksContainer.appendChild(taskContainer);
    }
        
} 