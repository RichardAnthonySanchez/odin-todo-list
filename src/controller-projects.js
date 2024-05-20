const projectsController = (function () {

    function projectManager() {
        let projectActionIndex = prompt('Do you want to, 1. add a project');
        let projectContent;

        if (projectActionIndex === '1') {
            projectContent = getNewProjectName();
        } else {
            console.error('input is invalid');
        }
        return { projectActionIndex, projectContent }
    }

    function getNewProjectName() {
        let newProjectName = prompt('Please type the desired name for your new project');
        return newProjectName;
    }

    return {
        projectManager,
    }

})();

export default projectsController;