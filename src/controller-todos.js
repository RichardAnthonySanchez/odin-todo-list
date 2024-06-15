import { addDays, addWeeks, addMonths, format } from 'date-fns';

const todosController = (function() {
    
    function addTask(usersNewTaskTitle) {
        return usersNewTaskTitle;
    }

    function selectedTodoProperty(selectedProperty) {
        //let selectedProperty = prompt('Do you want to, 1. edit the title of the task, 2. edit the priority of the task 3. edit the description of the task 4. edit the due date of a task');
        let propertyContent;
        if (selectedProperty == '1') {
            propertyContent = updateTodoTitle();
        } else if (selectedProperty == '2') {
            propertyContent = updateTodoPriority();
        } else if (selectedProperty == '3') {
            propertyContent = updateTodoDescription();
        } else if (selectedProperty == '4') {
            propertyContent = updateTodoDueDate();
        } else {
            propertyContent = 'Invalid input from user'
        }
        return { propertyContent, selectedProperty };
    }

    function updateTodoTitle() {
        let newTitle = prompt('Type your desired todo title here');
        return newTitle
    }

    function updateTodoPriority() {
        let priorityNumber = prompt('Select a new priority, 1. Low, 2. Medium, 3. High');
        let newPriority;
        
        if (priorityNumber == '1') {
            newPriority = 'Low'
        } else if (priorityNumber == '2') {
            newPriority = 'Medium'
        } else if (priorityNumber == '3') {
            newPriority = 'High'
        } else {
            console.log('Invalid priority number. Unable to select the new priority.')
        }

        return newPriority
    }

    function updateTodoDescription() {
        let newDescription = prompt('Type your desried todo description here');
        return newDescription
    }


    function updateTodoDueDate() {
        let dueDateIndex = prompt('Select the due date for this todo, 1. tomorrow 2. next week 3. next month');
        let dueDate;
    
        if (dueDateIndex === '1') {
            dueDate = addDays(new Date(), 1);
        } else if (dueDateIndex === '2') {
            dueDate = addWeeks(new Date(), 1);
        } else if (dueDateIndex === '3') {
            dueDate = addMonths(new Date(), 1);
        } else {
            console.error('Invalid input. Due date not modified');
            return null;
        }
    
        const formattedDueDate = format(dueDate, 'EEEE, d MMM yyyy');
        return `${formattedDueDate}`;
    }
    
    return {
        addTask,
        selectedTodoProperty,
    }

})();

export default todosController;