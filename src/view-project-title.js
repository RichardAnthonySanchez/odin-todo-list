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
            let projectTaskCount = projects[eachProject].todos.length;
            projectTaskCount = projectTaskCount.toString();
            
            const navContainer = createNavContainer();
            const navHeaderContainer = createNavHeaderContainer();  
            const headerContent = createHeaderContent(projectName);
            const menuIcon = createMenuIcon();
            const navCounterContainer = createNavCounterContainer();
            const taskCountElement = createTaskCountElement(projectTaskCount);
            

            appendProjectElementsToNav (
                 navHeaderContainer,
                 navContainer, 
                 customProjectsContainer, 
                 menuIcon, 
                 headerContent,
                 navCounterContainer,
                 taskCountElement
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

    function createNavCounterContainer() {
        const navCounterContainer = document.createElement('span');
        navCounterContainer.setAttribute('class', 'nav-item-right');
        return navCounterContainer;
    }

    function createTaskCountElement(projectTaskCount) {
        const taskCountElement = document.createElement('span');
        taskCountElement.setAttribute('class', 'project-task-count');
        taskCountElement.innerHTML = projectTaskCount;
        return taskCountElement;
    }

    function appendProjectElementsToNav(navHeaderContainer, navContainer, customProjectsContainer, menuIcon, headerContent, navCounterContainer, taskCountElement) {
        navHeaderContainer.appendChild(menuIcon);
        navHeaderContainer.appendChild(headerContent);
        navCounterContainer.appendChild(taskCountElement);
        navContainer.appendChild(navHeaderContainer);
        navContainer.appendChild(navCounterContainer);
        customProjectsContainer.appendChild(navContainer);
    }

    return {
        viewProjectTitle,
        viewProjects,
    }

})();

export default projectViewer;