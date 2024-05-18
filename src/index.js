import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import defaultProjects from './default-projects.json'
import todosInterface from './interface-todos';
import projectInterface from './interface-projects';

function component() {
  todosInterface.checkForStoredTodosInterface(defaultTodos);
  projectInterface.checkForStoredProjectsInterface(defaultProjects);
  todosInterface.displayCurrentTasks();
  projectInterface.displayProjectTitle();
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
    } else if (e.target.classList.contains('task-checkbox')) {
        handleTaskCheckboxClick(e.target);
    } else if (e.target.classList.contains('task')) {
        handleTaskClick(e.target);
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