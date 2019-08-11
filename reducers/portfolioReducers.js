import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  portfolios: {}, // {leagueID: portfolio}
  leagueID: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_TYPES.CHOOSE_LEAGUE:
    return Object.assign({}, state,
      {
        leagueID: action.payload.leagueID,
      });
  case ACTION_TYPES.UPDATE_PORTFOLIOS:
    return Object.assign({}, state,
      {
        portfolios: action.payload.portfolios,
      });
  case ACTION_TYPES.INITIALIZE_PORTFOLIOS:
    return Object.assign({}, state,
      {
        portfolios: action.payload.portfolios
      })
  default:
    return state;
  }
};
