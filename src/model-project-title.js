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

        return {
            getProjectTitle,
            checkForStoredProjects,
            getProjects,
            addProject,
            createProjectObject,
        }
})();

export default createProjectTitle;