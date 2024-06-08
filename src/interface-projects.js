import projectViewer from './view-project-title';
import createProjectTitle from './model-project-title';
import projectsController from './controller-projects';
import InterfaceState from './interface-state';

const projectInterface = (function() {

    function displayProjectTitle(selectedProject) {
        const { title, subTitle } = createProjectTitle.getProjectTitle(selectedProject);
        projectViewer.viewProjectTitle(title, subTitle);
    }

    function checkForStoredProjectsInterface(projects) {
        createProjectTitle.checkForStoredProjects(projects);
    }

    function getProjectsInterface() {
        let projects = createProjectTitle.getProjects();
        projectViewer.viewProjects(projects);
    }

    function createNewProject(newProjectName) {
        const projects = createProjectTitle.getProjects();        
        const projectObject = createProjectTitle.createProjectObject(newProjectName, projects);
        createProjectTitle.addProject(projectObject);
        console.log('new project added!')
        getProjectsInterface();
    }

    function deleteProject(selectedProjectId) {
        const projects = createProjectTitle.getProjects();        
        createProjectTitle.removeProject(selectedProjectId, projects);
        projectViewer.viewProjects(projects);
    }

    function updateProjectNameInterface(updatedName){
        const projects = createProjectTitle.getProjects();        
        const state = InterfaceState.getStateInterface();
        let projectObject = createProjectTitle.getProjectFromId(state.selectedProject);
        projectObject = createProjectTitle.updateProjectName(projectObject, updatedName);
        const index = createProjectTitle.findIndexFromProject(projectObject, projects);
        createProjectTitle.replaceProject(index, projectObject, projects);
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
        } else if (projectActionIndex === '3') {
            projectViewer.viewProjects(projects);
        } else if (projectActionIndex === '4') {
            const selectedProjectId = projectObject.id
            createProjectTitle.removeProject(selectedProjectId, projects);
            projectViewer.viewProjects(projects);
        } else if (projectActionIndex === '5') {
            const selectedProjectName = projectObject.name
            InterfaceState.setStateInterface({ selectedProject: selectedProjectName });
        } else {
            console.error('invalid input at project manager interface');
        }
    }

    function getNewProjectState(projectId) { 
        InterfaceState.setStateInterface({ selectedProject: projectId });
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
        getNewProjectState,
        createNewProject,
        deleteProject,
        updateProjectNameInterface,
    }

})()

export default projectInterface;
