import { ActionConst } from 'react-native-router-flux';
import { combineReducers } from 'redux';

// import the other reducers
import authReducer from './authReducers';
import portfolioAndLeagueReducer from './portfolioAndLeagueReducer';

const sceneReducer = (state = {}, action) => {
  switch (action.type) {
  case ActionConst.FOCUS:
    return { ...state, route: action.routeName };
  default:
    return state;
  }
};

export default combineReducers({
  scenes: sceneReducer,
  auth: authReducer,
  portfolioAndLeague: portfolioAndLeagueReducer,
});
