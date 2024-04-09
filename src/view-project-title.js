import { format } from 'date-fns'

export default function viewProjectTitle() {
    const currentDate = new Date();
    const formattdDate = format(currentDate, 'EEEE, d MMM yyyy');
    const upperCaseDate = formattdDate.toLocaleUpperCase();

    const projectTitle = document.getElementById('project-title');
    const subTitle = document.createElement('h3');
    subTitle.setAttribute('id', 'project-title-2');
    subTitle.innerHTML = upperCaseDate;
    projectTitle.appendChild(subTitle);
}