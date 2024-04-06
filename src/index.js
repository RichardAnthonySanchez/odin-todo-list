import './style.css';
import _ from 'lodash';
import defaultTodos from './default-todos.json'
import viewTodos from './view-todos'

function component() {
  viewTodos(defaultTodos);
  }
  
  component();