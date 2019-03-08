const choosePortfolio = (portfolio) => {
   return {
      'type': 'CHOOSE_PORTFOLIO',
      'payload': {
         portfolio
      }
   }
}

export {
   choosePortfolio
}