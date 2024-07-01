import StateManager from "../models/model-state";

const InterfaceState = (function() {

    return {

        getStateInterface: function() {
            const state = StateManager.getState();
            return state;
        },

        setStateInterface: function(newState) {
            StateManager.setState(newState);
        },
    }
    
})();

export default InterfaceState;