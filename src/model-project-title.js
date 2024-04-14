import { format } from 'date-fns';

const createProjectTitle = (function() {

    function createTitle () {
        let titleContent = 'Today';
        return titleContent;
    }

    function createSubtitle () {    
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

        return {
            getProjectTitle,
        }
})();

export default createProjectTitle;