const projectViewer = (function () {

    function viewProjectTitle(title, sub) {
        const projectTitle = document.getElementById('project-title');
        projectTitle.innerHTML = '';

        const titleContent = document.createElement('h1');
        titleContent.setAttribute('id', 'project-title-1');
        titleContent.innerHTML = title;
        projectTitle.appendChild(titleContent);
    
        const subTitle = document.createElement('h3');
        subTitle.setAttribute('id', 'project-title-2');
        subTitle.innerHTML = sub;
        projectTitle.appendChild(subTitle);
    }

    function viewProjects(projects) {
        console.log('these are your projects');

        for (let eachProject = 0; eachProject < projects.length; eachProject++) {
            let projectName = projects[eachProject].name
            console.log(projectName);
        }
    }

    return {
        viewProjectTitle,
        viewProjects,
    }

})();

export default projectViewer;