import { ACTION_TYPES } from '../actions/actionTypes';

const initialState = {
  userId: null,
  token: null,
  email: null,
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_USER:
      return Object.assign({}, state,
        {
          userId: action.payload.userId,
          token: action.payload.token,
        });
    case ACTION_TYPES.REGISTER_USER:
      return Object.assign({}, state,
        { email: action.payload.email });
    default:
      return state;
  }
};
