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
        const customProjectsContainer = document.querySelector('.custom-projects');
        customProjectsContainer.innerHTML = '';

        for (let eachProject = 0; eachProject < projects.length; eachProject++) {
            let projectName = projects[eachProject].name
            
            let navItem = document.createElement('span');
            navItem.setAttribute('class', 'nav-item');

            let navTitle = document.createElement('span');
            navTitle.setAttribute('class', 'nav-item-left');
        
            let titleContent = document.createElement('h3');
            titleContent.innerHTML = projectName;

            let menuIcon = document.createElement('span');
            menuIcon.setAttribute('class', 'material-symbols-rounded');
            menuIcon.innerHTML = 'menu';
            
            navTitle.appendChild(menuIcon);
            navTitle.appendChild(titleContent);
            navItem.appendChild(navTitle);
            customProjectsContainer.appendChild(navItem)
        }
    }

    return {
        viewProjectTitle,
        viewProjects,
    }

})();

export default projectViewer;