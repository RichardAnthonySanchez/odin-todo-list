import StateInterface from './interface-state';
import ProjectsModel from '../models/model-projects';
import ProjectsView from '../views/view-projects';
import ProjectsController from '../controllers/controller-projects';
import TodosInterface from './interface-todos';

const ProjectsInterface = (function () {

    function displayProjectTitle(selectedProject) {
        const { title, subTitle } = ProjectsModel.getProjectTitle(selectedProject);
        ProjectsView.viewProjectTitle(title, subTitle);
    }

    function checkForStoredProjectsInterface(projects) {
        ProjectsModel.checkForStoredProjects(projects);
    }

    function getProjectsInterface() {
        let projects = ProjectsModel.getProjects();
        ProjectsView.viewProjects(projects);
        return projects;
    }

    function createNewProject(newProjectName) {
        const projects = ProjectsModel.getProjects();
        const projectObject = ProjectsModel.createProjectObject(newProjectName, projects);
        ProjectsModel.addProject(projectObject);
        console.log('new project added!')
        getProjectsInterface();
        return projectObject;
    }

    function deleteProject(selectedProjectId) { 
        let projects = ProjectsModel.getProjects();
        let state = StateInterface.getStateInterface();
        
        if (selectedProjectId === state.selectedProject) {
            ProjectsModel.removeProject(selectedProjectId, projects);
            projects = ProjectsModel.getProjects();
            const firstProjectId = projects[0].id;
            StateInterface.setStateInterface({ selectedProject: firstProjectId });
            state = StateInterface.getStateInterface();
        } else {
            ProjectsModel.removeProject(selectedProjectId, projects);
            ProjectsView.viewProjects(projects);
        }
    }

    function updateProjectNameInterface(updatedName) {
        const projects = ProjectsModel.getProjects();
        const state = StateInterface.getStateInterface();
        let projectObject = ProjectsModel.getProjectFromId(state.selectedProject);
        projectObject = ProjectsModel.modfiyProjectObjectByName(projectObject, updatedName);
        const index = ProjectsModel.findIndexFromProject(projectObject, projects);
        ProjectsModel.replaceProject(index, projectObject, projects);
    }

    function updateProjectTodosInterface(newTodoId) {
        const projects = ProjectsModel.getProjects();
        const state = StateInterface.getStateInterface();
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
        let projectSelectionData = ProjectsController.projectManager(projects);
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
            ProjectsView.viewProjects(projects);
        } else if (projectActionIndex === '3') {
            ProjectsView.viewProjects(projects);
        } else if (projectActionIndex === '4') {
            const selectedProjectId = projectObject.id
            ProjectsModel.removeProject(selectedProjectId, projects);
            ProjectsView.viewProjects(projects);
        } else if (projectActionIndex === '5') {
            const selectedProjectName = projectObject.name
            StateInterface.setStateInterface({ selectedProject: selectedProjectName });
        } else {
            console.error('invalid input at project manager interface');
        }
    }

    function getNewProjectState(projectId) {
        StateInterface.setStateInterface({ selectedProject: projectId });
    }

    function setStateFromProjects() {
        const projects = getProjectsInterface();
        StateInterface.setStateInterface({ projects: projects });
    }

    function updateStateFromProject(projectObject) {
        let state = StateInterface.getStateInterface();
        const projectId = projectObject.id;
        getNewProjectState(projectId);
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
        updateStateFromProject,
        setStateFromProjects,
    }

})()

export default ProjectsInterface;
