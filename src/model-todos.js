import _ from 'lodash';

const todoFilters = (function () {

    function getTodos() {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    }

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

    function currentTasks() {    
        let todos = getTodos();
        const filterCurrentTodos = _.filter(todos, { 'project': 'Today'});
        const filterOutCompletedTodos = _.filter(filterCurrentTodos, todo => !todo.completed);
        return { filterCurrentTodos, filterOutCompletedTodos }
    }

    function getCompletedTasks() {
        let todos = getTodos();
        let currentTasksResult = currentTasks(todos);
        const completedTasks = _.filter(currentTasksResult.filterCurrentTodos, { 'completed': true });
        return completedTasks;
    }

    function createTaskObject(taskTitle) {
        return {
            title: taskTitle,
            project: "Today",
        };
    }

    function clearTodos() {
        localStorage.removeItem('todos');
        console.log('Todos cleared from local storage');
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

    function refreshDefaultTodos(defaultTodos) {
        clearTodos();
        checkForStoredTodos(defaultTodos);
    }

    function addTodo(newTodo) {
        const todos = getTodos();

        todos.push(newTodo);

        saveTodos(todos);
    }

    function updateTodo(updatedTodo) {
        let todos = getTodos();
        const index = todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
            todos[index] = updatedTodo;
            localStorage.setItem('todos', JSON.stringify(todos));
        } else {
            console.log('Todo not found');
        }
    }    

    function switchTaskCompletionStatus(todo) {
        if (todo.completed) {
            todo.completed = false;
        } else {
            todo.completed = true;
        }
        return todo;
    }

    function findSelectedTodo(todoContent) {
        const todos = getTodos();
        const todoObject = todos.find(todo => todo.title === todoContent);
        return todoObject
    }

    function updateTodoTitle(todo, newTodoTitle) {
        todo.title = newTodoTitle;
        return todo
    }

    function updateTodoPriority(todo, newTodoPriority) {
        todo.priority = newTodoPriority
        return todo
    }

    function updateTodoDescription(todo, newTodoDescription) {
        todo.description = newTodoDescription
        return todo
    }

    return {
        filterUniqueProjects,
        currentTasks,
        getCompletedTasks,
        createTaskObject,
        saveTodos,
        checkForStoredTodos,
        addTodo,
        refreshDefaultTodos,
        switchTaskCompletionStatus,
        findSelectedTodo,
        updateTodo,
        updateTodoTitle,
        updateTodoPriority,
        updateTodoDescription,
    }

})();

export default todoFilters;