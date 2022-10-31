import * as types from "../Types";
const initialState = {
  isAuthenticated: !!localStorage.getItem("userToken"),
  msg: null,
  loading: true,
  farmers: null,
  farmer: null,
  user: null,
  staff: null,
  current_user: null,
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
        msg: action.msg,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case types.AUTH_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        current_user: action.payload,
      };

    case types.GET_ALL_FARMERS:
      return {
        ...state,
        loading: false,
        farmers: action.payload,
      };
    case types.GET_ALL_STAFFS:
      return {
        ...state,
        loading: false,
        staff: action.payload,
      };
    case types.GET_SPECIFIC_FARMER:
      return {
        ...state,
        loading: false,
        farmer: action.payload,
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
