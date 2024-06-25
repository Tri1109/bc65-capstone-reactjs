import { createSlice } from "@reduxjs/toolkit";
import { HOST_DOMAIN, TOKEN_AUTHOR, getDataTextStorage } from "../../Util/UtilFunction";
import { GetProductFavoriteActionAsync } from "./ProfileReducer";
import { message } from "antd";

const initialState = {
  productList: [],
  detailProductById: null,
};

const ProductReducer = createSlice({
  name: "ProductReducer",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setDetailProductById: (state, action) => {
      state.detailProductById = action.payload;
    },
  },
});

export const { setProductList, setDetailProductById } = ProductReducer.actions;

export default ProductReducer.reducer;

//---------API Call----------------
export const GetProductListActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HOST_DOMAIN}/api/Product`
      );
      console.log(res.data.content);
      const action = setProductList(res.data.content);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetProductByIdActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HOST_DOMAIN}/api/Product/getbyid?id=${id}`
      );
      console.log(res.data.content);
      const action = setDetailProductById(res.data.content);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const LikeProductActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.get(
        `${HOST_DOMAIN}/api/Users/like?productId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );
      console.log(res.data.content);
      const action = GetProductFavoriteActionAsync();
      message.success("Success!");
      dispatch(action);
    } catch (error) {
      console.error(error);
      message.error("Failed:" + error.message);
    }
  };
};

export const UnLikeProductActionAsync = (id) => {
  return async (dispatch) => {
    try {
      const token = getDataTextStorage(TOKEN_AUTHOR);
      const res = await axios.get(
        `${HOST_DOMAIN}/api/Users/unlike?productId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );
      console.log(res.data.content);
      const action = GetProductFavoriteActionAsync();
      dispatch(action);
      message.success("Success!");
    } catch (error) {
      console.error(error);
      message.error("Failed:" + error.message);

    }
  };
};
