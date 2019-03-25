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
   var portfolios = {};
   getPortfolios().then((res) => {
      res.data.forEach((portfolio) => {
         portfolios[portfolio.leagueId] = portfolio
      })
   }).catch((err) => {
      console.log(err);
   })

   return {
      'type': ACTION_TYPES.UPDATE_PORTFOLIOS,
      'payload': {
         portfolios
      }
   }
}

export {
   chooseLeague,
   updatePortfolios
}