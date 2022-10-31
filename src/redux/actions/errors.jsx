import * as types from "../Types";

export const getErrors = (msg, typeId) => {
  return {
    type: types.GET_ERRORS,
    payload: {
      msg,
      typeId,
    },
  };
};

export const loginFail = () => {
  return {
    type: types.LOGIN_FAIL,
  };
};
export const registerFail = () => {
  return {
    type: types.REGISTER_FAIL,
  };
};
