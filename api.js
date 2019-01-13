import axios from 'axios';
import store from './store/store';

const baseurl = 'http://localhost:5005/api';

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
   const config = getConfig();
   const data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
   };
   return await axios.post(baseurl + '/users', data, config);
}

const login = async (email, password) => {
   const config = getConfig();
   const data = {
      'email': email,
      'password': password
   };
   return await axios.post(baseurl + '/users/session', data, config);
};

const getStockHistory = async (ticker, length) => {
   let config = getConfig();
   config['params'] = {
      ticker,
      length
   };
   return await axios.get(baseurl + '/charts', config);
};

const joinLeague = async (inviteCode, buyPower, name) => {
   const config = getConfig();
   const data = {
      inviteCode,
      buyPower,
      name
   };
   return await axios.post(baseurl + '/portfolios', data, config);
};

export {
   register,
   login,
   getStockHistory,
   joinLeague
};