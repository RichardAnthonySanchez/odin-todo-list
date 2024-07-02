import StateModel from "../models/model-state";

const InterfaceState = (function() {

    return {

        getStateInterface: function() {
            const state = StateModel.getState();
            return state;
        },

        setStateInterface: function(newState) {
            StateModel.setState(newState);
        },
    }
    
})();

export default InterfaceState;