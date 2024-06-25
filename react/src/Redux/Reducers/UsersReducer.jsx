import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  HOST_DOMAIN,
  TOKEN_AUTHOR,
  USER_LOGIN,
  getDataJSONStorage,
  getDataTextStorage,
  setCookie,
  setDataJSONStorage,
  setDataTextStorage,
} from "../../Util/UtilFunction";
const initialState = {
  userLogin: getDataJSONStorage(USER_LOGIN),
  userInfo: {
    email: "",
    password: "",
    name: "",
    gender: true,
    phone: "",
  },
};

const UsersReducer = createSlice({
  name: "UsersReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    signupAction: (state, action) => {
      state.userInfo = action.payload;
    },
    logoutAction: (state) => {
      state.userLogin = null;
    },
  },
});

export const { loginAction, signupAction, logoutAction } = UsersReducer.actions;

export default UsersReducer.reducer;

// Action Thunk

//----------------- Đăng nhập-------------------
export const loginActionApi = (email, password) => {
  return async (dispatch) => {
    console.log(email, password);
    try {
      const res = await axios.post(`${HOST_DOMAIN}/api/Users/signin`, {
        email,
        password,
      });
      message.success("Logged in successfully!");
      const loginAct = loginAction(res.data.content);
      dispatch(loginAct);
      setDataJSONStorage(USER_LOGIN, res.data.content);
      setDataTextStorage(TOKEN_AUTHOR, res.data.content.accessToken);
      setCookie(TOKEN_AUTHOR, res.data.content.accessToken);
    } catch (error) {
      message.error("Login failed:" + error.message);
    }
  };
};

//----------------- Đăng kí-------------------
export const signupActionApi = (signupInfo) => {
  return async (dispatch) => {
    try {
      console.log(signupInfo);
      const res = await axios.post(
        `${HOST_DOMAIN}/api/Users/signup`,
        signupInfo
      );
      message.success("Sign Up Success!");
      console.log(res);
      const signup = signupAction(res.data.content);
      dispatch(signup);
    } catch (error) {
      message.error("Registration failed:" + error.message);
    }
  };
};
