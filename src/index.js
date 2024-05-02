import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import todosInterface from './interface-todos';
import projectInterface from './interface-projects';

function component() {
  todosInterface.checkForStoredTodosInterface(defaultTodos);
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
        let taskElement = e.target.parentElement;
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
    } else if (e.target.classList.contains('task')) {
        todosInterface.selectedTodoPropertyInterface();
    }
});

  
}

  component();