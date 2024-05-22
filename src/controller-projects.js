import _ from "lodash";

const projectsController = (function () {

    function projectManager(projects) {
        let projectActionIndex = prompt('Do you want to, 1. add a project 2. edit the name of a project');
        let projectContent;
        let projectObject;

        if (projectActionIndex === '1') {
            projectContent = getNewProjectName();
        } else if (projectActionIndex === '2') {
            let selectedProject = projectSelector(projects);
            projectObject = editProjectName(selectedProject);
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

    function projectSelector(projects) {

        // Map the projects array to a string with id and name
        const projectList = _.map(projects, (project) => `${project.id}: ${project.name}`).join('\n');
        console.log(projectList);

        // Prompt the user with the project list
        const selectedId = prompt(`Please select a project by its id:\n${projectList}`);
        
        // Check if the id is valid
        const selectedProject = _.find(projects, { id: selectedId });
        if (!selectedProject) {
            console.log('Invalid selection. Please try again.');
            return null;
        }

        // the id input is returning invalid. possibly not accepting a string input
        
        // Return the selected project
        return selectedProject;
    }

    return {
        projectManager,
    }

})();

export default projectsController;