import StateModel from "../models/model-state";

const StateInterface = (function() {

    return {

        getStateInterface: function() {
            const state = StateModel.getState();
            return state;
        },

        setStateInterface: function(newState) {
            StateModel.setState(newState);
        },

        subscribeStateInterface: function(callback){
            StateModel.subscribe(callback);
        },
    }
    
})();

export default StateInterface;