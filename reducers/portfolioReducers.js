import { ACTION_TYPES } from '../actions/actionTypes';

const initialState = {
   portfolios: {},   // {leagueID: portfolio}
   leagueID: null
}

export default portfolioReducer = (state = initialState, action) => {
   switch (action.type) {
      case ACTION_TYPES.CHOOSE_PORTFOLIO:
         return Object.assign({}, state, 
            { 
               leagueID: action.payload.leagueID
            });
      case ACTION_TYPES.UPDATE_PORTFOLIOS:
         return Object.assign({}, state, 
            {
               portfolios: action.payload.portfolios
            });
      default:
         return state;
   }
};
