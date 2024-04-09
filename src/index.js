import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import viewTodos from './view-todos'
import viewProjectTitle from './view-project-title';

function component() {
  viewTodos(defaultTodos);
  viewProjectTitle();
  }
  
  component();