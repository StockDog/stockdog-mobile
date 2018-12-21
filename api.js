import axios from 'axios';
import store from './store/store';

const baseurl = 'http://localhost:5005/api';

const getConfig = (auth = true) => {
   var token = auth ? store.getState().auth.token : null;
   return {
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `token ${token}`
      },
      data: {}
   }
}

const register = async (firstName, lastName, email, password) => {
   var data = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
   };
   return await axios.post(baseurl + '/users', data, getConfig(auth=false));
}

const login = async (email, password) => {
   var data = {
      'email': email,
      'password': password
   };
   return await axios.post(baseurl + '/users/session', data, getConfig(auth=false));
};

const getStockHistory = async (ticker, length) => {
   var config = getConfig();
   config['params'] = {
      ticker,
      length
   };
   return await axios.get(baseurl + '/charts', config);
};

export {
   register,
   login,
   getStockHistory
};