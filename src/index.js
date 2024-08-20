import './styles/style.css';
import './styles/task.css';
import './styles/nav.css';
import './styles/header.css';
import './styles/content.css';
//import _ from 'lodash';
import defaultTodos from './data/default-todos.json'
import defaultProjects from './data/default-projects.json'
import TodosInterface from './interfaces/interface-todos';
import ProjectsInterface from './interfaces/interface-projects';
import StateInterface from './interfaces/interface-state';

if (process.env.NODE_ENV !== 'production') {
    //create a button for refreshing default projects and todos
    //view refresh default data
    TodosInterface.viewDefaultDataButtonInterface();
}

function component() {
    StateInterface.setStateInterface({ selectedProject: '1' });
    let state = StateInterface.getStateInterface();
    let selectedProject = state.selectedProject;

    ProjectsInterface.checkForStoredProjectsInterface(defaultProjects);
    TodosInterface.checkForStoredTodosInterface(defaultTodos);

    ProjectsInterface.displayProjectTitle(selectedProject);

    TodosInterface.displayCurrentTasks();
    TodosInterface.displayCompletedTasks();

    StateInterface.subscribeStateInterface(TodosInterface.displayCurrentTasks);
    StateInterface.subscribeStateInterface(TodosInterface.displayCompletedTasks);
    StateInterface.subscribeStateInterface(() => {
        let state = StateInterface.getStateInterface();
        let selectedProject = state.selectedProject;
        ProjectsInterface.displayProjectTitle(selectedProject);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.id === 'add-task-input') {
            const inputValue = e.target.value;
            TodosInterface.addTaskInterface(inputValue);
            e.target.value = '';
            e.target.blur();
        } else if (e.key === 'Enter' && e.target.id === 'add-project-input') {
            e.preventDefault();
            const inputValue = e.target.value;
            const projectObject = ProjectsInterface.createNewProject(inputValue);
            ProjectsInterface.updateStateFromProject(projectObject);
            e.target.value = '';
            e.target.blur();
            const navModal = document.getElementById('nav');
            navModal.classList.remove('active');
            navModal.close();
        } else if (e.key === 'Enter' && e.target.id === 'project-title-1') {
            e.preventDefault();
            let inputValue = e.target.innerText;
            ProjectsInterface.updateProjectNameInterface(inputValue);
            e.target.blur();
        } else if (e.key === 'Enter' && e.target.id === 'task-note') {
            e.preventDefault();
            let inputValue = e.target.innerText;
            const state = StateInterface.getStateInterface();
            const selectedTodoId = state.selectedTodo;
            const selectedTodo = TodosInterface.getTodoFromIdInterface(selectedTodoId);
            TodosInterface.updateTodoDescription(selectedTodo, inputValue);
            e.target.blur();
        } else if (e.key === 'Enter' && e.target.id === 'task-title') {
            e.preventDefault();
            const inputValue = e.target.innerText;
            TodosInterface.updateTodoTitleInterface(inputValue);
            e.target.value = '';
            e.target.blur();
            TodosInterface.displayCurrentTasks();
            TodosInterface.displayCompletedTasks();
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.id === 'refresh-todos') {
            StateInterface.setStateInterface({ selectedProject: '1' });
            TodosInterface.refreshDefaultTodosInterface(defaultTodos);
            ProjectsInterface.refreshDefaultProjectsInterface(defaultProjects);
        } else if (e.target.classList.contains('task-checkbox')) {
            handleTaskCheckboxClick(e.target);
        } else if (e.target.classList.contains('task')) {
            handleTaskClick(e.target);
        } else if (e.target.id === 'nav-open') {
            ProjectsInterface.getProjectsInterface();
            //nav.classList.add('active');
            document.getElementById('nav').showModal();
        } else if (e.target.id === 'nav-close' /* || (!nav.contains(e.target) && nav.classList.contains('active'))*/) {
            //nav.classList.remove('active');
            document.getElementById('nav').close();
        } else if (e.target.classList.contains('nav-item')) {
            const projectElement = e.target.closest('.nav-item');
            const projectId = projectElement.getAttribute('data-project-id');
            ProjectsInterface.getNewProjectState(projectId);
            const navModal = document.getElementById('nav');
            navModal.classList.remove('active');
            navModal.close();
        } else if (e.target.classList.contains('project-delete')) {
            const projectElement = e.target.closest('.nav-item');
            const projectId = projectElement.getAttribute('data-project-id');
            ProjectsInterface.deleteProject(projectId);
        } else if (e.target.matches('.important')) {
            TodosInterface.viewTodoPriorityOptionsInterface();
        } else if (e.target.matches('.menu-option.low')) {
            const newPriorityValue = 'Low';
            TodosInterface.changeTodoPropertyInterface(newPriorityValue);
            TodosInterface.displaySelectedPriorityInterface(newPriorityValue);
            TodosInterface.viewTodoPriorityOptionsInterface();
        } else if (e.target.matches('.menu-option.medium')) {
            const newPriorityValue = 'Medium';
            TodosInterface.changeTodoPropertyInterface(newPriorityValue);
            TodosInterface.displaySelectedPriorityInterface(newPriorityValue);
            TodosInterface.viewTodoPriorityOptionsInterface();
        } else if (e.target.matches('.menu-option.high')) {
            const newPriorityValue = 'High';
            TodosInterface.changeTodoPropertyInterface(newPriorityValue);
            TodosInterface.displaySelectedPriorityInterface(newPriorityValue);
            TodosInterface.viewTodoPriorityOptionsInterface();
        } else if (e.target.matches('.due-date')) {
            TodosInterface.viewDueDateOptionsInterface();
        } else if (e.target.matches('.menu-option.tomorrow')) {
            const dueDateIndex = '1'
            TodosInterface.changeTodoDueDateInterface(dueDateIndex);
            TodosInterface.viewDueDateOptionsInterface();
        } else if (e.target.matches('.menu-option.week')) {
            const dueDateIndex = '2'
            TodosInterface.changeTodoDueDateInterface(dueDateIndex);
            TodosInterface.viewDueDateOptionsInterface();
        } else if (e.target.matches('.menu-option.month')) {
            const dueDateIndex = '3'
            TodosInterface.changeTodoDueDateInterface(dueDateIndex);
            TodosInterface.viewDueDateOptionsInterface();
        } else if (e.target.matches('.my-project')) {
            TodosInterface.viewSelectableProjectsInterface();
        } else if (e.target.matches('.menu-option.project')) {
            const projectMenu = document.getElementById('project-menu');
            const projectElement = e.target.querySelector('span');
            const projectName = projectElement.className;
            TodosInterface.changeTodoProjectInterface(projectName);
            projectMenu.classList.add('hidden');
        } else if (e.target.id === 'task-checkbox') {
            const state = StateInterface.getStateInterface();
            const selectedTodoId = state.selectedTodo;
            const selectedTodo = TodosInterface.getTodoFromIdInterface(selectedTodoId);
            handleSelectedTaskCheckbox(selectedTodo);
        } else if (e.target.id === 'task-delete') {
            TodosInterface.removeTaskInterface();
            TodosInterface.displayCurrentTasks();
            TodosInterface.displayCompletedTasks();
            closeModal();
        } else if (e.target.id === 'theme-toggle') {
            const themeToggleButton = document.getElementById('theme-toggle');

            themeToggleButton.classList.toggle('light-mode');

            if (!document.body.classList.contains('light-mode')) {
                document.body.classList.add('light-mode');
            } else 
                document.body.classList.toggle('light-mode');
        }
        
    });

    function handleTaskCheckboxClick(checkbox) {
        let taskElement = checkbox.parentElement;
        while (taskElement && !taskElement.classList.contains('task')) {
            taskElement = taskElement.parentElement;
        }

        if (taskElement) {
            const todoContent = taskElement.querySelector('.task-content').textContent;
            let todoObject = TodosInterface.findSelectedTodoInterface(todoContent);
            if (todoObject) {
                TodosInterface.switchTaskCompletionStatusInterface(todoObject);
            }
        }
    }


    function handleSelectedTaskCheckbox(todoObject) {
        TodosInterface.switchTaskCompletionStatusInterface(todoObject);
    }

    function handleTaskClick(taskElement) {
        const todoContent = taskElement.querySelector('.task-content').textContent;
        let todoObject = TodosInterface.findSelectedTodoInterface(todoContent);
        const state = StateInterface.getStateInterface();
        StateInterface.setStateInterface({ selectedTodo: todoObject.id });
        const todoTitle = todoObject.title;
        const selectedProjectId = state.selectedProject;
        const selectedProject = ProjectsInterface.getProjectFromIdInterface(selectedProjectId);

        TodosInterface.displaySelectedTitleInterface(todoTitle);
        TodosInterface.displaySelectedDescriptionInterface(todoObject.description);
        TodosInterface.displaySelectedPriorityInterface(todoObject.priority);
        TodosInterface.displaySelectedDueDateInterface(todoObject.due_date);
        TodosInterface.displaySelectedTodosProjectInterface(selectedProject.name);

        const taskModal = document.getElementById('task');
        taskModal.classList.add('active');
        taskModal.showModal();
    }

    function closeModal() {
        const taskModal = document.getElementById('task');
        taskModal.classList.remove('active');
        taskModal.close();
        //const state = StateInterface.getStateInterface();
        StateInterface.setStateInterface({ selectedTodo: null });
    }

    document.getElementById('task-close').addEventListener('click', function () {
        closeModal();
    });

}

component();