import { format } from 'date-fns';
import _ from 'lodash';

const ProjectsModel = (function() {

    function createTitle(selectedProject) {
        let titleContent = selectedProject;
        return titleContent;
    }

    function createSubtitle(selectedProject) {    
        let subtitleContent;

        if (selectedProject === 'Today') {
            const currentDate = new Date();
            const formattdDate = format(currentDate, 'EEEE, d MMM yyyy');
            const upperCaseDate = formattdDate.toLocaleUpperCase();
            subtitleContent = upperCaseDate;
        } else {
            subtitleContent = '';
        }

        return subtitleContent;
    }

    function getProjectTitle(selectedProjectId) {
        const projects = getProjects();
        if (projects.length === 0) {
            console.log('no projects. please add a project');
        } else {
            const projectObject =  getProjectFromId(selectedProjectId);
            const selectedProject = projectObject.name;
            let title = createTitle(selectedProject);
            let subTitle = createSubtitle(selectedProject);
            return { title, subTitle }
        }
    }

    function saveProjects(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
        console.log('projects stored successfully');
    }

    function checkForStoredProjects(defaultProjects) {
        let storedProjects = localStorage.getItem('projects')

        if (storedProjects !== null) {
            console.log('Projects are already in local storage', storedProjects);
        } else {
            saveProjects(defaultProjects);
        }
    }

    function getProjects() {
        const storedProjects = localStorage.getItem('projects');
        let projects;
        if (storedProjects) {
            try {
                projects = JSON.parse(storedProjects);
            } catch (error) {
                projects = [];
                console.log('get projects recived the following error: ' + error);
            }
        } else {
            projects = [];
        }
        return projects;
    }

    function addProject(newProject) {
        const projects = getProjects();

        projects.push(newProject);

        saveProjects(projects);
    }

    function updateProject(updatedProject) {
        let projects = getProjects();
        const index = projects.findIndex(project => project.id === updatedProject.id);
        if (index !== -1) {
            projects[index] = updatedProject;
        }
        return projects;
    }

    function createProjectObject(projectTitle, projects) {
        return {
            name: projectTitle,
            id: `${projects.length + 1}`,
            todos: [],
        };
    }
    
    function modfiyProjectObjectByName(projectObject, updatedName) {
        projectObject.name = updatedName
        return projectObject;
    }

    function findIndexFromProject(projectObject, projects) {
        const selectedProjectId = projectObject.id;
        const index = projects.findIndex(project => project.id === selectedProjectId);
        return index
    }

    function replaceProject(index, projectObject, projects) {
        projects[index] = projectObject;
        saveProjects(projects);
    }

    function clearProjects() {
        localStorage.removeItem('projects');
        console.log('Projects cleared from local storage');
    }

    function refreshDefaultProjects(defaultProjects) {
        clearProjects()
        checkForStoredProjects(defaultProjects);
    }

    function removeProject(selectedProjectId, projects) {
        const index = projects.findIndex(project => project.id === selectedProjectId);
        if (index !== -1) {
            projects.splice(index, 1);
            saveProjects(projects);
        } else {
            console.log('Project not found');
        }
    }

    function getProjectFromId(projectId) {
        const projects = getProjects();
        let projectObject = _.find(projects, { id: projectId });
    
        if (!projectObject) {
            if (projects.length === 0) {
                console.log('you have no projects.  please add a project.');
            } else {
                const firstProjectId = projects[0].id;
                projectObject = _.find(projects, { id: firstProjectId });
            }
        } else {
            // keep the original value of the project object
        }
                
        return projectObject;
    }    

    function getProjectFromName(projectName) {
        const projects = getProjects();
        const projectObject = _.find(projects, { name: projectName });
        return projectObject
    }

    function removeTodoFromProject(todoId, selectedProjectId) {
        const selectedProject = getProjectFromId(selectedProjectId);
        let statesProjectsTodos = selectedProject.todos;
    
        _.remove(statesProjectsTodos, (id) => id === todoId);
        selectedProject.todos = statesProjectsTodos;
        
        return selectedProject;
    }

    function addTodoToProject(todoId, projectName) {
        const selectedProject = getProjectFromName(projectName);
        selectedProject.todos.push(todoId);
        return selectedProject
    }

        return {
            getProjectTitle,
            checkForStoredProjects,
            getProjects,
            addProject,
            createProjectObject,
            modfiyProjectObjectByName,
            refreshDefaultProjects,
            removeProject,
            getProjectFromId,
            findIndexFromProject,
            replaceProject,
            removeTodoFromProject,
            addTodoToProject,
            updateProject,
            saveProjects,
        }
})();

export default ProjectsModel;