import _ from 'lodash';

const todoFilters = (function () {

    function getTodos() {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    }

    function getProjects() {
        const storedProjects = localStorage.getItem('projects');
        let projects;
        if (storedProjects) {
            try {
                projects = JSON.parse(storedProjects);
            } catch (error) {
                projects = [];
            }
        } else {
            projects = [];
        }
        return projects;
    }

    function getCurrentProject() {
        const projects = getProjects();
        const currentProject = _.find(projects, { 'name': 'Today' });
            if (!currentProject) {
            console.error("Today project not found.");
            return;
            }
        return currentProject
    } 

    function getCurrentProjectIds(currentProject) {
        const currentTodoIds = currentProject.todos;
        return currentTodoIds
    }

    function filterCurrentTodos(currentTodoIds, todos) {
        const currentTodos = _.filter(todos, todo => {
            return currentTodoIds.includes(todo.id);
        });
        return currentTodos;
    }

    function removeCompletedTodosFromCurrentProject(currentTodos) {
        const activeTodos = _.filter(currentTodos, todo => !todo.completed);
        return activeTodos
    }
    
    function currentTasks() {   
        const todos = getTodos();
        let currentProject = getCurrentProject();
        let currentTodoIds = getCurrentProjectIds(currentProject);
        let currentTodos = filterCurrentTodos(currentTodoIds, todos);
        let activeTodos = removeCompletedTodosFromCurrentProject(currentTodos);
        
        return { 
            filterCurrentTodos: currentTodos,
            filterOutCompletedTodos: activeTodos 
        };
    }
    
    function getCompletedTasks() {
        let currentTasksResult = currentTasks();
        const completedTasks = _.filter(currentTasksResult.filterCurrentTodos, { 'completed': true });
        return completedTasks;
    }

    function createTaskObject(taskTitle) {
        return {
            title: taskTitle,
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
        getProjects,
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