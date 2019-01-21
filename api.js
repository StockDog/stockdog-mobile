import axios from 'axios';
import store from './store/store';

const baseurl = 'http://localhost:5005/api/v1.0';

const getConfig = (auth = true) => {
  const token = auth ? store.getState().auth.token : null;
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    },
    data: {}
  }
}

const register = async (firstName, lastName, email, password) => {
  const data = {
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "password": password
  };
  return await axios.post(`${baseurl}/users`, data, getConfig(auth = false));
}

const login = async (email, password) => {
  const data = {
    'email': email,
    'password': password
  };
  return await axios.post(`${baseurl}/users/session`, data, getConfig(auth = false));
};

const getStockHistory = async (ticker, length) => {
  let config = getConfig();
  config['params'] = {
    length
  };
  return await axios.get(`${baseurl}/charts/${ticker}`, config);
};

export {
  register,
  login,
  getStockHistory
};