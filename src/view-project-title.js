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
        const customProjectsContainer = createCustomProjectsContainer();

        for (let eachProject = 0; eachProject < projects.length; eachProject++) {
            let projectName = projects[eachProject].name
            
            const navContainer = createNavContainer();
            const navHeaderContainer = createNavHeaderContainer();  
            const headerContent = createHeaderContent(projectName);
            const menuIcon = createMenuIcon();

            appendProjectElementsToNav (
                 navHeaderContainer,
                 navContainer, 
                 customProjectsContainer, 
                 menuIcon, 
                 headerContent
                )
        }
    }

    function createCustomProjectsContainer() {
        const customProjectsContainer = document.querySelector('.custom-projects');
        customProjectsContainer.innerHTML = '';
        return customProjectsContainer;
    }

    function createNavContainer() {
        let navContainer = document.createElement('span');
        navContainer.setAttribute('class', 'nav-item');
        return navContainer
    }

    function createNavHeaderContainer() {
        let navHeaderContainer = document.createElement('span');
        navHeaderContainer.setAttribute('class', 'nav-item-left');
        return navHeaderContainer
    }

    function createHeaderContent(projectName) {
        let headerContent = document.createElement('h3');
        headerContent.innerHTML = projectName;
        return headerContent
    }

    function createMenuIcon() {
        let menuIcon = document.createElement('span');
        menuIcon.setAttribute('class', 'material-symbols-rounded');
        menuIcon.innerHTML = 'menu';
        return menuIcon
    }

    function appendProjectElementsToNav(navHeaderContainer, navContainer, customProjectsContainer, menuIcon, headerContent) {
        navHeaderContainer.appendChild(menuIcon);
        navHeaderContainer.appendChild(headerContent);
        navContainer.appendChild(navHeaderContainer);
        customProjectsContainer.appendChild(navContainer);
    }

    return {
        viewProjectTitle,
        viewProjects,
    }

})();

export default projectViewer;