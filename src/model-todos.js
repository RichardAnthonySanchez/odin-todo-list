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

    function addDefaultTodosToStorage(defaultTodos) {
        localStorage.setItem('todos', JSON.stringify(defaultTodos));
        console.log('todos stored successfully');
    }

    function checkForStoredTodos(defaultTodos) {
        let storedTodos = localStorage.getItem('todos')

        if (storedTodos !== null) {
            console.log('Todos are already in local storage', storedTodos);
        } else {
            console.log('Todos are not present in local storage yet...');
            addDefaultTodosToStorage(defaultTodos);
        }
    }

    return {
        filterUniqueProjects,
        currentTasks,
        getCompletedTasks,
        createTaskObject,
        addDefaultTodosToStorage,
        checkForStoredTodos,
    }

})();

export default todoFilters;