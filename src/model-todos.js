import _ from 'lodash';

const todoFilters = (function () {

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

    function getCompletedTasks(todos) {
        let currentTasksResult = currentTasks(todos);
        const completedTasks = _.filter(currentTasksResult, { 'completed': true});
        return completedTasks;
    }

    return {
        filterUniqueProjects,
        currentTasks,
        getCompletedTasks,
    }

})();

export default todoFilters;