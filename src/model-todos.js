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
        const filterCurrentTodos = _.filter(todos, { 'project': 'Today'});
        const filterOutCompletedTodos = _.filter(filterCurrentTodos, todo => !todo.completed);
        return { filterCurrentTodos, filterOutCompletedTodos }
    }

    function getCompletedTasks(todos) {
        let currentTasksResult = currentTasks(todos);
        const completedTasks = _.filter(currentTasksResult.filterCurrentTodos, { 'completed': true });
        return completedTasks;
    }

    function createTaskObject(taskTitle) {
        return {
            title: taskTitle,
        };
    }

    return {
        filterUniqueProjects,
        currentTasks,
        getCompletedTasks,
        createTaskObject,
    }

})();

export default todoFilters;