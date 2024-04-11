export default function viewProjectTitle(title, sub) {
    const projectTitle = document.getElementById('project-title');

    const titleContent = document.createElement('h1');
    titleContent.setAttribute('id', 'project-title-1');
    titleContent.innerHTML = title;
    projectTitle.appendChild(titleContent);

    const subTitle = document.createElement('h3');
    subTitle.setAttribute('id', 'project-title-2');
    subTitle.innerHTML = sub;
    projectTitle.appendChild(subTitle);
}