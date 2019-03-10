const initialState = {
   portfolios: [], 
   leagueID: null
}

export default portfolioReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'CHOOSE_PORTFOLIO':
         return Object.assign({}, state, 
            { 
               leagueID: action.payload.leagueID
            });
      case 'UPDATE_PORTFOLIOS':
         return Object.assign({}, state, 
            {
               portfolios: action.payload.portfolios
            });
      default:
         return state;
   }
};
