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

    function getTodos() {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    }

    function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log('todos stored successfully');
    }

    function checkForStoredTodos(defaultTodos) {
        let storedTodos = localStorage.getItem('todos')

        if (storedTodos !== null) {
            console.log('Todos are already in local storage', storedTodos);
        } else {
            saveTodos(defaultTodos);
        }
    }

    function addTodo(newTodo) {
        const todos = getTodos();

        todos.push(newTodo);

        saveTodos(todos);
    }

    return {
        filterUniqueProjects,
        currentTasks,
        getCompletedTasks,
        createTaskObject,
        saveTodos,
        checkForStoredTodos,
        addTodo,
    }

})();

export default todoFilters;