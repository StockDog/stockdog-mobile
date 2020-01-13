import { getPortfolios, getLeague } from '../api';
import ACTION_TYPES from './actionTypes';

const chooseLeague = (leagueId) => ({
  type: ACTION_TYPES.CHOOSE_LEAGUE,
  payload: {
    leagueId,
  },
});

const initializePortfoliosAndLeague = (portfolioList, league) => {
  const portfolios = {};
  portfolioList.forEach((portfolio) => {
    portfolios[portfolio.league.id] = portfolio;
  });

  return {
    type: ACTION_TYPES.INITIALIZE_PORTFOLIOS_AND_LEAGUE,
    payload: {
      portfolios,
      leagueId: portfolioList[0].league.id,
      league,
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

const updateLeague = (leagueId) => async (dispatch) => {
  const newLeague = (await getLeague(leagueId)).data;

  dispatch({
    type: ACTION_TYPES.UPDATE_LEAGUE,
    payload: {
      league: newLeague,
    },
  });
};

export {
  chooseLeague,
  initializePortfoliosAndLeague,
  updatePortfolios,
  updateLeague,
};
