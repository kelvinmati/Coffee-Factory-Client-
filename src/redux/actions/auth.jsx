import axios from "axios";
import toast from "react-hot-toast";
import * as types from "../Types";
import { getErrors, loginFail } from "./errors";
const AUTH_API = "http://localhost:4000/user";
// Authentication using the stored token
export const authToken = () => {
  // Get token from localStorage
  const token = localStorage.getItem("userToken");
  // Headers
  const config = {
    headers: {
      "content-Type": "application/json",
    },
  };
  // if token exist ,add authorizarion

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
// auth user
export const authUser = () => async (dispatch) => {
  try {
    const response = await axios.get(`${AUTH_API}/profile`, authToken());
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.AUTH_USER,
        payload: data,
      });
      // console.log("current user is", data);
    }
  } catch (error) {
    console.log(error);
  }
};

// register user
export const registerUser = (payload) => async (dispatch) => {
  const { firstname, lastname, role, email, password, phone_number, gender } =
    payload;
  // config
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    firstname,
    lastname,
    role,
    email,
    password,
    phone_number,
    gender,
  });
  try {
    const response = await axios.post(`${AUTH_API}/register`, body, config);
    const data = response.data;
    console.log("register data is", data);
    if (data) {
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: data,
        msg: data?.message,
      });
      localStorage.setItem("userToken", data?.token);
      // dispatch(getErrors(error.response.data, types.REGISTER_SUCCESS));
      toast.success(data.message);
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch(getErrors(error.response.data, types.REGISTER_FAIL));
    toast.error(error.response.data);
  }
};
// login user
export const loginUser = (payload) => async (dispatch) => {
  const { email, password } = payload;
  // config
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //   body
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    const response = await axios.post(`${AUTH_API}/login`, body, config);
    const data = response.data;
    const token = data.token;
    console.log(data);
    if (data) {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userToken", token);

      toast.success(`${data.message}`);
    }
  } catch (error) {
    dispatch(getErrors(error.response.data, types.LOGIN_FAIL));
    toast.error(`${error.response.data}`);
    dispatch(loginFail());
  }
};
// get all farmers
export const getAllFarmers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${AUTH_API}/farmers`, authToken());
    const data = await response.data;
    // console.log("all farmers", data);
    if (data) {
      dispatch({
        type: types.GET_ALL_FARMERS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// get specific farmer
export const getSpecificFarmer = (farmerId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/user/farmerId/${farmerId}`,
      authToken()
    );
    const data = await response.data;
    // console.log("data is", data);
    dispatch({
      type: types.GET_SPECIFIC_FARMER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// get all staff
export const getAllStaff = () => async (dispatch) => {
  try {
    const response = await axios.get(`${AUTH_API}/staff`, authToken());
    const data = await response.data;
    // console.log("all farmers", data);
    if (data) {
      dispatch({
        type: types.GET_ALL_STAFFS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// logout
export const logout = () => (dispatch) => {
  try {
    localStorage.removeItem("userToken");
    dispatch({
      type: types.LOGOUT_SUCCESS,
    });
    toast.success("Your are now logged out");
  } catch (error) {
    console.log(error);
  }
};

// admin login
export const adminLogin = (payload) => async (dispatch) => {
  const { email, password } = payload;
  // config
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // request body
  const body = JSON.stringify({
    email,
    password,
  });
  try {
    const response = await axios.post(
      `http://localhost:4000/admin/admin-login`,
      config,
      body
    );
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.ADMIN_LOGIN_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error.response);
  }
};
