import { getPortfolios } from '../api';
import ACTION_TYPES from './actionTypes';

const chooseLeague = (leagueId) => ({
  type: ACTION_TYPES.CHOOSE_LEAGUE,
  payload: {
    leagueId,
  },
});

const initializePortfolios = (portfolioList) => {
  const portfolios = {};
  portfolioList.forEach((portfolio) => {
    portfolios[portfolio.league.id] = portfolio;
  });

  return {
    type: ACTION_TYPES.INITIALIZE_PORTFOLIOS,
    payload: {
      portfolios,
      leagueId: portfolioList[0].league.id,
    },
  };
};

const updatePortfolios = () => async (dispatch) => {
  const portfolios = {};
  const portfolioRes = await getPortfolios();
  portfolioRes.data.forEach((portfolio) => {
    portfolios[portfolio.league.id] = portfolio;
  });

  dispatch({
    type: ACTION_TYPES.UPDATE_PORTFOLIOS,
    payload: {
      portfolios,
    },
  });
};

export {
  chooseLeague,
  initializePortfolios,
  updatePortfolios,
};
