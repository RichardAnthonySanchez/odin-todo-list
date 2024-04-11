import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import viewTodos from './view-todos'
import createProjectTitle from './model-project-title';

function component() {
  viewTodos(defaultTodos);
  createProjectTitle.getProjectTitle();
  }
  
  component();