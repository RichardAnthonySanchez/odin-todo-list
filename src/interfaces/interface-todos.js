import ProjectsInterface from "./interface-projects";
import ProjectsModel from "../models/model-projects"; 
import TodosModel from "../models/model-todos";
import TodosView from "../views/view-todos";
import TodosController from "../controllers/controller-todos";

const TodosInterface = (function() {

    function displayCurrentTasks(){
        let currentTasks = TodosModel.currentTasks();
        TodosView.viewCurrentTodos(currentTasks.filterOutCompletedTodos);
    }

    function displayCompletedTasks() {
        let completedTasks = TodosModel.getCompletedTasks();
        TodosView.viewCompletedTodos(completedTasks);
    }

    function addTaskInterface(usersNewTaskTitle) {
        TodosController.addTask(usersNewTaskTitle);
        let newTask = TodosModel.createTaskObject(usersNewTaskTitle);
        TodosModel.addTodo(newTask);
        const newTasksId = newTask.id;
        ProjectsInterface.updateProjectTodosInterface(newTasksId);
        displayCurrentTasks();
    }

    function checkForStoredTodosInterface(defaultTodos) {
        TodosModel.checkForStoredTodos(defaultTodos);
    }

    function refreshDefaultTodosInterface(defaultTodos) {
        TodosModel.refreshDefaultTodos(defaultTodos);
        displayCurrentTasks();
    }

    function switchTaskCompletionStatusInterface(todo) {
        let updatedTodo = TodosModel.switchTaskCompletionStatus(todo);
        TodosModel.updateTodo(updatedTodo);
        displayCurrentTasks();
        displayCompletedTasks();
    }

    function findSelectedTodoInterface(todoContent) {
        let todoObject = TodosModel.findSelectedTodo(todoContent);
        return todoObject;
    }

    function selectedTodoPropertyInterface(todo) {
        let todoPropertyAndValue = TodosController.selectedTodoProperty();
        let todoProperty = todoPropertyAndValue.selectedProperty;
        let newPropertyValue = todoPropertyAndValue.propertyContent;
        let updatedTodo;

        if (todoProperty == '1') {
            updatedTodo = TodosModel.updateTodoTitle(todo, newPropertyValue);
        } else if (todoProperty == '2') {
            updatedTodo = TodosModel.updateTodoPriority(todo, newPropertyValue);
        } else if (todoProperty == '3') {
            updatedTodo = TodosModel.updateTodoDescription(todo, newPropertyValue);
        } else if (todoProperty == '4') {
                updatedTodo = TodosModel.updateTodoDueDate(todo, newPropertyValue);
        } else {
            console.log('selected todo property is invalid')
        }

        TodosModel.updateTodo(updatedTodo);
        displayCurrentTasks();
        displayCompletedTasks();
        TodosView.viewSelectedTodoProperty(newPropertyValue);
    }

    function updateTodoDescription(todo, newPropertyValue) {
        const updatedTodo = TodosModel.updateTodoDescription(todo, newPropertyValue);
        TodosModel.updateTodo(updatedTodo);
        TodosView.viewSelectedTodoProperty(newPropertyValue);
    }

    function getTodoFromIdInterface(selectedTodoIndex) {
        const todos = TodosModel.getTodos();
        const todoObject = TodosModel.getTodoFromId(selectedTodoIndex, todos);
        return  todoObject;
    }

    function getTodoTitleInterface(todoObject) {
        const title = todoObject.title;
        return title;
    }

    function viewSelectableProjectsInterface() {
        const projects = ProjectsInterface.getProjectsInterface();
        TodosView.viewSelectableProjects(projects);
    }

    function displaySelectedTitleInterface(todoTitle) {
        TodosView.viewSelectedTodoTitle(todoTitle)
    }

    function displaySelectedDescriptionInterface(todoDescription) {
        TodosView.viewSelectedTodoDescription(todoDescription);
    }

    function displaySelectedPriorityInterface(todoPriority) {
        TodosView.viewSelectedTodoPriority(todoPriority)
    }

    function displaySelectedDueDateInterface(todoDueDate) {
        TodosView.viewSelectedTodoDueDate(todoDueDate);
    }

    function displaySelectedTodosProjectInterface(todoProject) {
        TodosView.viewSelectedTodosProject(todoProject)
    }

    function viewTodoPriorityOptionsInterface() {
        TodosView.viewTodoPriorityOptions();
    }

    function viewDueDateOptionsInterface() {
        TodosView.viewDueDateOptions();
    }

    function changeTodoPropertyInterface(newPriorityValue) { // this method should  be named priority not property
        const state = TodosModel.getState();
        const selectedTodoIndex = state.selectedTodo;
        const todos = TodosModel.getTodos();
        const todoObject = TodosModel.getTodoFromId(selectedTodoIndex, todos);
        const updatedTodo = TodosModel.updateTodoPriority(todoObject, newPriorityValue);

        TodosModel.updateTodo(updatedTodo);
        
        displayCurrentTasks();
        displayCompletedTasks();
    }

    function changeTodoDueDateInterface(dueDateIndex) {
        const formattedDueDate = TodosController.updateTodoDueDate(dueDateIndex);
        TodosModel.updateSelectedTodoDueDate(formattedDueDate);
        displaySelectedDueDateInterface(formattedDueDate);
    }

    function changeTodoProjectInterface(newProjectName) {
        const state = TodosModel.getState();
        const selectedTodo = state.selectedTodo;
        const selectedProject = state.selectedProject;

        // remove the selected todo index from the project array
        const splicedProject = ProjectsModel.removeTodoFromProject(selectedTodo, selectedProject); //debug every thing under this within the method
        const projects = ProjectsModel.updateProject(splicedProject); //this is making a dupe project object
        ProjectsModel.saveProjects(projects);
        
        
        // add the selected todo to the selected project
        const updatedProject = ProjectsModel.addTodoToProject(selectedTodo, newProjectName);
        const updatedProjects = ProjectsModel.updateProject(updatedProject); //this is making a dupe project object
        ProjectsModel.saveProjects(updatedProjects);

        // view the current and completed tasks 
        displayCurrentTasks();
        displayCompletedTasks();
        displaySelectedTodosProjectInterface(updatedProject.name);
    }

    return {
        displayCurrentTasks,
        displayCompletedTasks,
        addTaskInterface,
        checkForStoredTodosInterface,
        refreshDefaultTodosInterface,
        switchTaskCompletionStatusInterface,
        findSelectedTodoInterface,
        selectedTodoPropertyInterface,
        getTodoTitleInterface,
        displaySelectedTitleInterface,
        getTodoFromIdInterface,
        updateTodoDescription,
        displaySelectedDescriptionInterface,
        displaySelectedPriorityInterface,
        viewTodoPriorityOptionsInterface,
        changeTodoPropertyInterface,
        displaySelectedDueDateInterface,
        viewDueDateOptionsInterface,
        changeTodoDueDateInterface,
        displaySelectedTodosProjectInterface,
        viewSelectableProjectsInterface,
        changeTodoProjectInterface,
    }
})()

export default TodosInterface;