import axios from 'axios';
import configureStore from './store/store';

const {store} = configureStore();

const baseurl = 'http://localhost:5005/api/v1.0';

const getConfig = (auth = true) => {
  const token = auth ? store.getState().auth.token : null;
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    }
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

const loginGoogle = async (googleIdToken, appType, os) => {
  const data = {
    googleIdToken,
    appType,
    os,
  };
  return axios.post(`${baseurl}/users/session/google`, data, getConfig(false));
};

const loginApple = async (appleIdToken, appType, givenName, familyName) => {
  const data = {
    appleIdToken,
    appType,
    givenName,
    familyName,
  };
  return axios.post(`${baseurl}/users/session/apple`, data, getConfig(false));
};

const getStockHistory = async (ticker, length) => {
  const config = getConfig();
  config.params = {
    length,
  };
  return axios.get(`${baseurl}/stocks/${ticker}/chart`, config);
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
};

const getLeagues = async () => {
  const config = getConfig();
  return axios.get(`${baseurl}/leagues`, config);
};

const getPortfolios = async () => {
  const config = getConfig();
  return axios.get(`${baseurl}/portfolios`, config);
};

export {
  register,
  login,
  loginGoogle,
  loginApple,
  getStockHistory,
  tradeStock,
  createLeague,
  joinLeague,
  getPortfolios,
  getLeague,
  getLeagues,
};
