import { ActionConst } from 'react-native-router-flux';
import { combineReducers } from 'redux';

// import the other reducers
import authReducer from './authReducers';
import portfolioReducer from './portfolioReducers';

const sceneReducer = (state = {}, action) => {
    switch(action.type){
        case ActionConst.FOCUS:
            return { ...state, "route": action.routeName };
        default:
            return state;
    }    
}


export default reducers = combineReducers({
    'scenes': sceneReducer,
    'auth': authReducer,
    'portfolio': portfolioReducer
});
