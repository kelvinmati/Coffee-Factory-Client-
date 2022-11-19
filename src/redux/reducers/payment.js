import * as types from "../Types";

const initialState = {
  loading: true,
  msg: null,
  transactions: null,
  transaction: null,
  payable_farmers: [],
  account_details: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PAYABLE_FARMERS:
      return {
        ...state,
        loading: false,
        payable_farmers: action.payload,
      };
    case types.PAYMENT_SUCCESS:
      return {
        ...state,
        msg: action.payload,
      };
    case types.GET_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case types.GET_SINGLE_TRANSACTION:
      return {
        ...state,
        loading: false,
        transaction: action.payload,
      };
    case types.GET_ACC_DETAILS:
      return {
        ...state,
        loading: false,
        account_details: action.payload,
      };
    default:
      return state;
  }
};
