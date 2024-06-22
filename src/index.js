import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import defaultProjects from './default-projects.json'
import todosInterface from './interface-todos';
import projectInterface from './interface-projects';
import InterfaceState from './interface-state';
import StateManager from './model-state';

function component() {

    InterfaceState.setStateInterface({ selectedProject: '1' });
    let state = InterfaceState.getStateInterface();
    let selectedProject = state.selectedProject;

    projectInterface.checkForStoredProjectsInterface(defaultProjects);
    todosInterface.checkForStoredTodosInterface(defaultTodos);

    projectInterface.displayProjectTitle(selectedProject);

    todosInterface.displayCurrentTasks();
    todosInterface.displayCompletedTasks();

    StateManager.subscribe(todosInterface.displayCurrentTasks);
    StateManager.subscribe(todosInterface.displayCompletedTasks);
    StateManager.subscribe(() => {
        let state = InterfaceState.getStateInterface();
        let selectedProject = state.selectedProject;
        projectInterface.displayProjectTitle(selectedProject);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.id === 'add-task-input') {
            const inputValue = e.target.value;
            todosInterface.addTaskInterface(inputValue);
            e.target.value = '';
            e.target.blur();
        } else if (e.key === 'Enter' && e.target.id === 'add-project-input') {
            const inputValue = e.target.value;
            projectInterface.createNewProject(inputValue);
        } else if (e.key === 'Enter' && e.target.id === 'project-title-1'){
            e.preventDefault();
            let inputValue = e.target.innerText;
            projectInterface.updateProjectNameInterface(inputValue);
            e.target.blur();
        } else if (e.key === 'Enter' && e.target.id === 'task-note') {
            e.preventDefault();
            let inputValue = e.target.innerText;
            const state = InterfaceState.getStateInterface();
            const selectedTodoId = state.selectedTodo;
            const selectedTodo = todosInterface.getTodoFromIdInterface(selectedTodoId);
            todosInterface.updateTodoDescription(selectedTodo, inputValue);
            e.target.blur();
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.id === 'refresh-todos') {
            todosInterface.refreshDefaultTodosInterface(defaultTodos);
            projectInterface.refreshDefaultProjectsInterface(defaultProjects);
        } else if (e.target.classList.contains('task-checkbox')) {
            handleTaskCheckboxClick(e.target);
        } else if (e.target.classList.contains('task')) {
            handleTaskClick(e.target);
        } else if (e.target.id === 'nav-open') {
            projectInterface.getProjectsInterface();
            nav.classList.add('active');
        } else if (e.target.id === 'nav-close' || (!nav.contains(e.target) && nav.classList.contains('active'))) {
            nav.classList.remove('active');
        } else if (e.target.classList.contains('nav-item')) {
            const projectElement = e.target.closest('.nav-item');
            const projectId = projectElement.getAttribute('data-project-id');
            projectInterface.getNewProjectState(projectId);
        } else if (e.target.classList.contains('project-delete')) {
            const projectElement = e.target.closest('.nav-item');
            const projectId = projectElement.getAttribute('data-project-id');
            projectInterface.deleteProject(projectId);
        } else if (e.target.id === 'important-content') {
            todosInterface.viewTodoPriorityOptionsInterface();
        } else if (e.target.matches('.menu-option.low')) {
            const newPriorityValue = 'Low';
            todosInterface.changeTodoPropertyInterface(newPriorityValue);
            todosInterface.displaySelectedPriorityInterface(newPriorityValue);
            todosInterface.viewTodoPriorityOptionsInterface();
        } else if (e.target.matches('.menu-option.medium')) {
            const newPriorityValue = 'Medium';
            todosInterface.changeTodoPropertyInterface(newPriorityValue);
            todosInterface.displaySelectedPriorityInterface(newPriorityValue);
            todosInterface.viewTodoPriorityOptionsInterface();
        } else if (e.target.matches('.menu-option.high')) {
            const newPriorityValue = 'High';
            todosInterface.changeTodoPropertyInterface(newPriorityValue);
            todosInterface.displaySelectedPriorityInterface(newPriorityValue);
            todosInterface.viewTodoPriorityOptionsInterface();
        } 
    });

    function handleTaskCheckboxClick(checkbox) {
        let taskElement = checkbox.parentElement;
        while (taskElement && !taskElement.classList.contains('task')) {
            taskElement = taskElement.parentElement;
        }

        if (taskElement) {
            const todoContent = taskElement.querySelector('.task-content').textContent;
            let todoObject = todosInterface.findSelectedTodoInterface(todoContent);
            if (todoObject) {
                todosInterface.switchTaskCompletionStatusInterface(todoObject);
            }
        }
    }

    function handleTaskClick(taskElement) {
        const todoContent = taskElement.querySelector('.task-content').textContent;
        let todoObject = todosInterface.findSelectedTodoInterface(todoContent);
        const state = InterfaceState.getStateInterface();
        InterfaceState.setStateInterface({ selectedTodo: todoObject.id });
        const todoTitle = todoObject.title;

        todosInterface.displaySelectedTitleInterface(todoTitle);
        todosInterface.displaySelectedDescriptionInterface(todoObject.description);
        todosInterface.displaySelectedPriorityInterface(todoObject.priority);
        todosInterface.displaySelectedDueDateInterface(todoObject.due_date);

        const taskModal = document.getElementById('task');
        taskModal.classList.add('active');
    }

    function closeModal() {
        const taskModal = document.getElementById('task');
        taskModal.classList.remove('active');
        const state = InterfaceState.getStateInterface();
        InterfaceState.setStateInterface({ selectedTodo: null });
    }

    document.getElementById('task-close').addEventListener('click', function() {
        closeModal();
    });

}

component();