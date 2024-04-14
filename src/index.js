import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import todosInterface from './interface-todos';
import projectInterface from './interface-projects';

function component() {
  todosInterface.displayCurrentTasks(defaultTodos);
  projectInterface.displayProjectTitle();
  }
  
  component();