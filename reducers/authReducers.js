export default authReducer = (state = {userId: null, token: null, email: null}, action) => {
   switch (action.type) {
      case 'LOGIN_USER':
         return Object.assign({}, state, 
            { 
               userId: action.payload.userId,
               token: action.payload.token
            });
      case 'REGISTER_USER':
         return Object.assign({}, state, 
            { email: action.payload.email });
      default:
         return state;
   }
};
