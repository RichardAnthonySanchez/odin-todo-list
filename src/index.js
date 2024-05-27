import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import defaultProjects from './default-projects.json'
import todosInterface from './interface-todos';
import projectInterface from './interface-projects';
import InterfaceState from './interface-state';

function component() {

    InterfaceState.setStateInterface({ selectedProject: 'Today' });
    let state = InterfaceState.getStateInterface();
    let selectedProject = state.selectedProject;

    projectInterface.checkForStoredProjectsInterface(defaultProjects);
    todosInterface.checkForStoredTodosInterface(defaultTodos);

    projectInterface.displayProjectTitle(selectedProject);

    todosInterface.displayCurrentTasks();
    todosInterface.displayCompletedTasks();

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.id === 'add-task-input') {
            const inputValue = e.target.value;
            todosInterface.addTaskInterface(inputValue);
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.id === 'refresh-todos') {
            todosInterface.refreshDefaultTodosInterface(defaultTodos);
            projectInterface.refreshDefaultProjectsInterface(defaultProjects);
        } else if (e.target.classList.contains('task-checkbox')) {
            handleTaskCheckboxClick(e.target);
        } else if (e.target.classList.contains('task')) {
            handleTaskClick(e.target);
        } else if (e.target.id === 'nav-open') {
            projectInterface.projectManagerInterface();
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
        todosInterface.selectedTodoPropertyInterface(todoObject);
    }

}

  component();