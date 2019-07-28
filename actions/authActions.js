import ACTION_TYPES from './actionTypes';

const registerUser = (firstname, lastname, email, password) => ({
  type: ACTION_TYPES.REGISTER_USER,
  payload: {
    firstname,
    lastname,
    email,
    password,
  },
});

const loginUser = (userId, token) => ({
  type: ACTION_TYPES.LOGIN_USER,
  payload: {
    userId,
    token,
  },
});

export {
  registerUser,
  loginUser,
};
