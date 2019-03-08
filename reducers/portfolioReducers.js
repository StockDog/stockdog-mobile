export default portfolioReducer = (state = {}, action) => {
   switch (action.type) {
      case 'CHOOSE_PORTFOLIO':
         return Object.assign({}, state, 
            { 
               portfolio: action.payload.portfolio
            });
      default:
         return state;
   }
};
