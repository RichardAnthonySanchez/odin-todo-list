import viewProjectTitle from './view-project-title';
import createProjectTitle from './model-project-title';

const projectInterface = (function() {

    function displayProjectTitle(){
        const { title, subTitle } = createProjectTitle.getProjectTitle();
        viewProjectTitle(title, subTitle);
    }

    function checkForStoredProjectsInterface(projects) {
        createProjectTitle.checkForStoredProjects(projects);
    }
    
    return {
        displayProjectTitle,
        checkForStoredProjectsInterface,
    }

})()

export default projectInterface;
