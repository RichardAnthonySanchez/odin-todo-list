import _ from "lodash";

const projectsController = (function () {

    function projectManager(projects) {
        let projectActionIndex = prompt('Do you want to, 1. add a project 2. edit the name of a project 3. display the number of todos in each project');
        let projectContent;
        let projectObject;

        if (projectActionIndex === '1') {
            projectContent = getNewProjectName();
        } else if (projectActionIndex === '2') {
            let selectedProject = projectSelector(projects);
            projectObject = editProjectName(selectedProject);
        } else if (projectActionIndex === '3') {
            const projectList = mapProjects(projects);
            alert(projectList);
        } else {
            console.error('input is invalid');
        }
        return { projectActionIndex, projectContent, projectObject }
    }

    function getNewProjectName() {
        let newProjectName = prompt('Please type the desired name for your new project');
        return newProjectName;
    }

    function editProjectName(project) {
        let newProjectName = prompt('enter a new name for this project');
        project.name = newProjectName;
        return project
    }

    function mapProjects(projects) {
        const projectList = _.map(projects, (project) => `${project.id}: ${project.name} (${project.todos.length})`).join('\n');
        return projectList
    }

    function validateId(requestedId, projects) {
        const selectedProject = _.find(projects, { id: requestedId });
        if (!selectedProject) {
            console.error('Invalid selection. Please try again.');
            return null;
        }
        return selectedProject
    }

    function projectSelector(projects) {
        const projectList = mapProjects(projects);
        const requestedId = prompt(`Please select a project by its id:\n${projectList}`);
        const selectedProject = validateId(requestedId, projects);
        
        return selectedProject;
    }

    return {
        projectManager,
    }

})();

export default projectsController;