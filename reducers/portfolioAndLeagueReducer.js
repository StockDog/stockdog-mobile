import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  portfolios: {}, // {leagueID: portfolio}
  leagueId: null,
  league: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ACTION_TYPES.CHOOSE_LEAGUE:
    return {
      ...state,
      leagueId: action.payload.leagueId,
    };
  case ACTION_TYPES.UPDATE_PORTFOLIOS:
    return {
      ...state,
      portfolios: action.payload.portfolios,
    };
  case ACTION_TYPES.INITIALIZE_PORTFOLIOS_AND_LEAGUE:
    return {
      ...state,
      portfolios: action.payload.portfolios,
      leagueId: action.payload.leagueId,
      league: action.payload.league,
    };
  case ACTION_TYPES.UPDATE_LEAGUE:
    return {
      ...state,
      league: action.payload.league,
    };
  default:
    return state;
  }
};
