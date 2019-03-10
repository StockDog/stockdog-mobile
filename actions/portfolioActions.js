import { getPortfolios } from '../api';

const chooseLeague = (leagueID) => {
   return {
      'type': 'CHOOSE_LEAGUE',
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
      'type': 'UPDATE_PORTFOLIOS',
      'payload': {
         portfolios
      }
   }
}

export {
   chooseLeague,
   updatePortfolios
}