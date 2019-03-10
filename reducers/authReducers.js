const initialState = {
   userId: null, 
   token: null, 
   email: null
}

export default authReducer = (state = initialState, action) => {
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
