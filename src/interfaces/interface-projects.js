import projectViewer from '../views/view-projects';
import projectsController from '../controllers/controller-projects'
import InterfaceState from './interface-state';
import ProjectsModel from '../models/model-projects';

const projectInterface = (function() {

    function displayProjectTitle(selectedProject) {
        const { title, subTitle } = ProjectsModel.getProjectTitle(selectedProject);
        projectViewer.viewProjectTitle(title, subTitle);
    }

    function checkForStoredProjectsInterface(projects) {
        ProjectsModel.checkForStoredProjects(projects);
    }

    function getProjectsInterface() {
        let projects = ProjectsModel.getProjects();
        projectViewer.viewProjects(projects);
        return projects;
    }

    function createNewProject(newProjectName) {
        const projects = ProjectsModel.getProjects();        
        const projectObject = ProjectsModel.createProjectObject(newProjectName, projects);
        ProjectsModel.addProject(projectObject);
        console.log('new project added!')
        getProjectsInterface();
    }

    function deleteProject(selectedProjectId) {
        const projects = ProjectsModel.getProjects();        
        ProjectsModel.removeProject(selectedProjectId, projects);
        projectViewer.viewProjects(projects);
    }

    function updateProjectNameInterface(updatedName){
        const projects = ProjectsModel.getProjects();        
        const state = InterfaceState.getStateInterface();
        let projectObject = ProjectsModel.getProjectFromId(state.selectedProject);
        projectObject = ProjectsModel.modfiyProjectObjectByName(projectObject, updatedName);
        const index = ProjectsModel.findIndexFromProject(projectObject, projects);
        ProjectsModel.replaceProject(index, projectObject, projects);
    }

    function updateProjectTodosInterface(newTodoId) {
        const projects = ProjectsModel.getProjects();        
        const state = InterfaceState.getStateInterface();
        let projectObject = ProjectsModel.getProjectFromId(state.selectedProject);
        projectObject.todos.push(newTodoId);
        const index = ProjectsModel.findIndexFromProject(projectObject, projects);
        ProjectsModel.replaceProject(index, projectObject, projects);
    }

    function getProjectFromIdInterface(id) {
        const projectObject = ProjectsModel.getProjectFromId(id);
        return projectObject
    }

    function projectManagerInterface() {
        let projects = ProjectsModel.getProjects();
        let projectSelectionData = projectsController.projectManager(projects);
        let projectActionIndex = projectSelectionData.projectActionIndex;
        let projectContent = projectSelectionData.projectContent;
        let projectObject = projectSelectionData.projectObject;
        if (projectActionIndex === '1') {
            projectObject = ProjectsModel.createProjectObject(projectContent, projects);
            ProjectsModel.addProject(projectObject);
            console.log('new project added!')
            getProjectsInterface();
        } else if (projectActionIndex === '2') {
            let updatedName = projectObject.name;
            ProjectsModel.modfiyProjectObjectByName(projectObject, updatedName);
            projectViewer.viewProjects(projects);
        } else if (projectActionIndex === '3') {
            projectViewer.viewProjects(projects);
        } else if (projectActionIndex === '4') {
            const selectedProjectId = projectObject.id
            ProjectsModel.removeProject(selectedProjectId, projects);
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
        ProjectsModel.refreshDefaultProjects(defaultProjects);
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
        updateProjectTodosInterface,
        getProjectFromIdInterface,
    }

})()

export default projectInterface;
