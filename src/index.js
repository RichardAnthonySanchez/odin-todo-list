import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import todosInterface from './interface-todos';
import projectInterface from './interface-projects';

function component() {
  todosInterface.displayCurrentTasks(defaultTodos);
  projectInterface.displayProjectTitle();
  todosInterface.displayCompletedTasks(defaultTodos);
  todosInterface.checkForStoredTodosInterface(defaultTodos);

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.id === 'add-task-input') {
        const inputValue = event.target.value;
        todosInterface.addTaskInterface(inputValue);
    }
});

}

  component();