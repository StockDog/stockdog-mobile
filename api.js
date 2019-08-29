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
  return axios.post(`${baseurl}/users`, data, getConfig(false));
};

const login = async (email, password) => {
  const data = {
    email,
    password,
  };
  return axios.post(`${baseurl}/users/session`, data, getConfig(false));
};

const getStockHistory = async (ticker, length) => {
  const config = getConfig();
  config.params = {
    length,
  };
  return await axios.get(`${baseurl}/stocks/${ticker}/chart`, config);
};

const tradeStock = async (shareCount, ticker, action, portfolioId) => {
  const config = getConfig();
  const data = {
    shareCount,
    ticker,
    action,
    portfolioId,
  };
  return axios.post(`${baseurl}/transactions`, data, config);
};

const createLeague = async (name, startPos, startDate, endDate) => {
  const config = getConfig();
  const data = {
    name,
    startPos,
    start: startDate,
    end: endDate,
  };
  return axios.post(`${baseurl}/leagues`, data, config);
};

const joinLeague = async (inviteCode, name) => {
  const config = getConfig();
  const data = {
    inviteCode,
    name,
  };
  return axios.post(`${baseurl}/portfolios`, data, config);
};

const getLeague = async (leagueId) => {
  const config = getConfig();
  return axios.get(`${baseurl}/leagues/${leagueId}`, config);
}

const getPortfolios = async () => {
  const config = getConfig();
  return axios.get(`${baseurl}/portfolios`, config);
};

export {
  register,
  login,
  getStockHistory,
  tradeStock,
  createLeague,
  joinLeague,
  getPortfolios,
  getLeague
};
