import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import createProjectTitle from './model-project-title';
import todosInterface from './interface-todos';

function component() {
  todosInterface.displayCurrentTasks(defaultTodos);
  createProjectTitle.getProjectTitle();
  }
  
  component();