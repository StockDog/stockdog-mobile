import axios from 'axios';
import store from './store/store';

const baseurl = 'http://localhost:5005/api/v1.0';

const getConfig = (auth = true) => {
  const token = auth ? store.getState().auth.token : null;
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    },
    data: {},
  };
};

const register = async (firstName, lastName, email, password) => {
  const data = {
    firstName,
    lastName,
    email,
    password,
  };
  return await axios.post(`${baseurl}/users`, data, getConfig(auth = false));
};

const login = async (email, password) => {
  const data = {
    email,
    password,
  };
  return await axios.post(`${baseurl}/users/session`, data, getConfig(auth = false));
};

const getStockHistory = async (ticker, length) => {
  const config = getConfig();
  config.params = {
    length,
  };
  return await axios.get(`${baseurl}/charts/${ticker}`, config);
};

const tradeStock = async (shareCount, ticker, action) => {
  const config = getConfig();
  // TODO: Implement portfolios in store
  // const portfolioId = store.getState().portfolios.currentPortfolio;
  const portfolioId = 1;
  const data = {
    shareCount,
    ticker,
    action,
    portfolioId,
  };
  return await axios.post(`${baseurl}/transactions`, data, config);
};

const createLeague = async (name, startPos, startDate, endDate) => {
  const config = getConfig();
  const data = {
    name,
    startPos,
    start: startDate,
    end: endDate,
  };
  return await axios.post(`${baseurl}/leagues`, data, config);
};

const joinLeague = async (inviteCode, name) => {
  const config = getConfig();
  const data = {
    inviteCode,
    name,
  };
  return await axios.post(`${baseurl}/portfolios`, data, config);
};

const getPortfolios = async () => {
  const config = getConfig();
  return await axios.get(`${baseurl}/portfolios`, config);
};

export {
  register,
  login,
  getStockHistory,
  tradeStock,
  createLeague,
  joinLeague,
  getPortfolios,
};
