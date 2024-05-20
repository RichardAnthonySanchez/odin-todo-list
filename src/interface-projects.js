import projectViewer from './view-project-title';
import createProjectTitle from './model-project-title';
import projectsController from './controller-projects';

const projectInterface = (function() {

    function displayProjectTitle(){
        const { title, subTitle } = createProjectTitle.getProjectTitle();
        projectViewer.viewProjectTitle(title, subTitle);
    }

    function checkForStoredProjectsInterface(projects) {
        createProjectTitle.checkForStoredProjects(projects);
    }

    function getProjectsInterface() {
        let projects = createProjectTitle.getProjects();
        projectViewer.viewProjects(projects);

    }

    function projectManagerInterface() {
        let projectSelectionData = projectsController.projectManager();
        let projectActionIndex = projectSelectionData.projectActionIndex;
        let projectContent = projectSelectionData.projectContent;
        if (projectActionIndex === '1') {
            let projectObject = createProjectTitle.createProjectObject(projectContent);
            createProjectTitle.addProject(projectObject);
            console.log('new project added!')
            getProjectsInterface();
        } else {
            console.error('invalid input at project manager interface');
        }
    }
    
    return {
        displayProjectTitle,
        checkForStoredProjectsInterface,
        getProjectsInterface,
        projectManagerInterface,
    }

})()

export default projectInterface;
