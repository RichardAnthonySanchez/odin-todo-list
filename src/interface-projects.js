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
        let projects = createProjectTitle.getProjects();
        let projectSelectionData = projectsController.projectManager(projects);
        let projectActionIndex = projectSelectionData.projectActionIndex;
        let projectContent = projectSelectionData.projectContent;
        let projectObject = projectSelectionData.projectObject;
        if (projectActionIndex === '1') {
            projectObject = createProjectTitle.createProjectObject(projectContent, projects);
            createProjectTitle.addProject(projectObject);
            console.log('new project added!')
            getProjectsInterface();
        } else if (projectActionIndex === '2') {
            let updatedName = projectObject.name;
            createProjectTitle.updateProjectName(projectObject, updatedName);
            projectViewer.viewProjects(projects);
        } else {
            console.error('invalid input at project manager interface');
        }
    }

    function refreshDefaultProjectsInterface(defaultProjects) {
        createProjectTitle.refreshDefaultProjects(defaultProjects);
    }
    
    return {
        displayProjectTitle,
        checkForStoredProjectsInterface,
        getProjectsInterface,
        projectManagerInterface,
        refreshDefaultProjectsInterface,
    }

})()

export default projectInterface;
