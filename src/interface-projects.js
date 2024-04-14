import viewProjectTitle from './view-project-title';
import createProjectTitle from './model-project-title';

const projectInterface = (function() {

    function displayProjectTitle(){
        const { title, subTitle } = createProjectTitle.getProjectTitle();
        viewProjectTitle(title, subTitle);
    }
    
    return {
        displayProjectTitle,
    }

})()

export default projectInterface;
