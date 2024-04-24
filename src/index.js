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

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.id === 'add-task-input') {
        const inputValue = event.target.value;
        todosInterface.addTaskInterface(inputValue);
    }
  });

  document.addEventListener('click', function(e) {
      if (e.target.id === 'refresh-todos') {
        todosInterface.refreshDefaultTodosInterface(defaultTodos)

      }
  });
  
}

  component();