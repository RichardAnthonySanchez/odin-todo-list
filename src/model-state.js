const StateManager = (function() {

    let state = JSON.parse(localStorage.getItem('appState')) || { selectedProject: null, projects: [] };

    let subscribers = [];

    return {
        getState: function() {
            return state;
        },
        setState: function(newState) {
            state = Object.assign({}, state, newState);
            localStorage.setItem('appstate', JSON.stringify(state));
            this.notify();
        },
        subscribe: function(callback) {
            if (typeof callback === 'function') {
                subscribers.push(callback);
            }
        },
        unsubscribe: function(callback) {
            let index = subscribers.indexOf(callback);
            if (index > -1 ) {
                subscribers.splice(index, 1);
            }
        },
        notify: function() {
            for (let i = 0; i < subscribers.length; i++) {
                subscribers[i]();
            }
        },

    }
})();

export default StateManager;