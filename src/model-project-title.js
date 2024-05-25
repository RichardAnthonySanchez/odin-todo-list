import { format } from 'date-fns';

const createProjectTitle = (function() {

    function createTitle() {
        let titleContent = 'Today';
        return titleContent;
    }

    function createSubtitle() {    
        const currentDate = new Date();
        const formattdDate = format(currentDate, 'EEEE, d MMM yyyy');
        const upperCaseDate = formattdDate.toLocaleUpperCase();
        return upperCaseDate;
    }

    function getProjectTitle() {
        let title = createTitle();
        let subTitle = createSubtitle();
        return { title, subTitle }
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

    function createProjectObject(projectTitle) {
        return {
            name: projectTitle,
        };
    }

    function updateProjectName(projectObject, updatedName) {
        projectObject.name = updatedName
        return projectObject;
    }

    function clearProjects() {
        localStorage.removeItem('projects');
        console.log('Projects cleared from local storage');
    }

    function refreshDefaultProjects(defaultProjects) {
        clearProjects()
        checkForStoredProjects(defaultProjects);
    }

        return {
            getProjectTitle,
            checkForStoredProjects,
            getProjects,
            addProject,
            createProjectObject,
            updateProjectName,
            refreshDefaultProjects,
        }
})();

export default createProjectTitle;