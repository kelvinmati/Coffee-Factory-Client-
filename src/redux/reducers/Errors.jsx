import * as types from "../Types";
const initialState = {
  msg: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ERRORS:
      return {
        ...state,
        msg: action.payload,
      };

    default:
      return state;
  }
};
