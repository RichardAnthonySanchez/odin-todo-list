import _ from 'lodash';

const todoFilters = (function (todos) {

    function filterUniqueProjects(todos) {    
        let projectArr = [];
        for (let i = 0; i < todos.length; i++) {
            let eachTodo = todos[i];
            let projectOfTodo = eachTodo.project;
            projectArr.push(projectOfTodo);
        }
        let uniqueProjects = _.uniq(projectArr);
        return uniqueProjects;
    }

    function currentTasks(todos) {    
        const filteredTodos = _.filter(todos, { 'project': 'Today'});
        let filteredTasks = [];
        for (let eachFilteredTodo = 0; eachFilteredTodo < filteredTodos.length; eachFilteredTodo++) {
            let task = filteredTodos[eachFilteredTodo];
            filteredTasks.push(task);
        }
        return filteredTasks
    }

    return {
        filterUniqueProjects,
        currentTasks,
    }

})();

export default todoFilters;