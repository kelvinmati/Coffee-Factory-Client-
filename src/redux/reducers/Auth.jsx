import * as types from "../Types";
const initialState = {
  isAuthenticated: !!localStorage.getItem("userToken"),
  loading: true,
  farmers: null,
  farmer: {},
  user: {},
  currentUser: {},
  admin: null,
};
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.AUTH_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        currentUser: action.payload,
      };

    case types.GET_ALL_FARMERS:
      return {
        ...state,
        loading: false,
        farmers: action.payload,
      };
    case types.GET_SPECIFIC_FARMER:
      return {
        ...state,
        loading: false,
        farmer: action.payload,
      };
    case types.CLEAR_FARMER:
      return {
        ...state,
        loading: false,
        farmer: {},
      };
    // admin login
    case types.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        admin: action.payload,
      };
    default:
      return state;
  }
};
