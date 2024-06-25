import { createSlice } from "@reduxjs/toolkit";
import {
  HOST_DOMAIN,
  TOKEN_AUTHOR,
  USER_LOGIN,
  getDataTextStorage,
  refreshAccessToken,
  removeDataTextStorage,
  setDataTextStorage,
} from "../../Util/UtilFunction";
import { setDetailProductById } from "./ProductReducer";
import { Modal, message } from "antd";
import { clearCart } from "./CartReducer";
import { logoutAction } from "./UsersReducer";

const initialState = {
  profileInfo: {},
  productFavorite: [],
};

const ProfileReducer = createSlice({
  name: "ProfileReducer",
  initialState,
  reducers: {
    setInfoProfile: (state, action) => {
      state.profileInfo = action.payload;
    },
    setProductFavorite: (state, action) => {
      state.productFavorite = action.payload;
    },
  },
});

export const { setInfoProfile, setProductFavorite } = ProfileReducer.actions;

export default ProfileReducer.reducer;

//---------API Call-------------
export const GetInfoProfileActionAsync = (navigate) => {
  return async (dispatch) => {
    const token = getDataTextStorage(TOKEN_AUTHOR);
    try {
      const res = await axios.post(
        `${HOST_DOMAIN}/api/Users/getProfile`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const action = setInfoProfile(res.data.content);
      dispatch(action);
    } catch (error) {
      message.error(
        error.message + ": Login session has expired, please log in again"
      );

      Modal.confirm({
        title: "Session Expired",
        content: "Your login session has expired. Please log in again.",
        onOk: () => {
          //chuyển đến trang login
          navigate("/login");
        },
        onCancel: () => {
          // Hủy bỏ hành động nếu người dùng không chọn OK
          removeDataTextStorage(TOKEN_AUTHOR);
          removeDataTextStorage(USER_LOGIN);
          navigate("/");
          const action = logoutAction();
          dispatch(action);
          dispatch(clearCart());
        },
      });
    }
  };
};

export const UpdateProfileActionAsync = (updateProfileData) => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.post(
        `${HOST_DOMAIN}/api/Users/updateProfile`,
        updateProfileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.content);
      const action = GetInfoProfileActionAsync();
      message.success("Update success!");
      dispatch(action);
    } catch (error) {
      console.error(error);
      message.error("Update failed:" + error.message);
    }
  };
};

export const GetProductFavoriteActionAsync = () => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.get(
        `${HOST_DOMAIN}/api/Users/getproductfavorite`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );
      console.log(res.data.content.productsFavorite);
      const action = setProductFavorite(res.data.content.productsFavorite);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
