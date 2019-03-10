export default portfolioReducer = (state = {portfolios: [], portfolioID: null}, action) => {
   switch (action.type) {
      case 'CHOOSE_PORTFOLIO':
         return Object.assign({}, state, 
            { 
               portfolioID: action.payload.portfolioID
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
