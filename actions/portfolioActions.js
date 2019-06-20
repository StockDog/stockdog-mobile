import { getPortfolios } from '../api';
import { ACTION_TYPES } from './actionTypes';

const chooseLeague = (leagueID) => {
  return {
    'type': ACTION_TYPES.CHOOSE_LEAGUE,
    'payload': {
      leagueID
    }
  }
}

const updatePortfolios = () => {
  return async (dispatch) => {
    var portfolios = {};
    let portfolioRes = await getPortfolios();
    portfolioRes.data.forEach((portfolio) => {
      portfolios[portfolio.leagueId] = portfolio
    });

    dispatch({
      'type': ACTION_TYPES.UPDATE_PORTFOLIOS,
      'payload': {
        portfolios
      }
    });
  }

}

export {
  chooseLeague,
  updatePortfolios
}