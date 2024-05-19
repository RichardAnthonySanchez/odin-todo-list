import projectViewer from './view-project-title';
import createProjectTitle from './model-project-title';

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
    
    return {
        displayProjectTitle,
        checkForStoredProjectsInterface,
        getProjectsInterface,
    }

})()

export default projectInterface;
