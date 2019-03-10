import { getPortfolios } from '../api';

const choosePortfolio = (portfolioID) => {
   return {
      'type': 'CHOOSE_PORTFOLIO',
      'payload': {
         portfolioID
      }
   }
}

const updatePortfolios = () => {
   var portfolios;
   getPortfolios().then((res) => {
      portfolios = res.data;
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
   choosePortfolio,
   updatePortfolios
}