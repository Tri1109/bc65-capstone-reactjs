// import { createSlice } from "@reduxjs/toolkit";
// import { clearCart } from "./CartReducer";

// const initialState = {
//   OrderList: [],
//   OrderDetailList:[]
// };

// const OderReducer = createSlice({
//   name: "OderReducer",
//   initialState,
//   reducers: {
//     // setOrderList: (state, action) => {
//     //   state.OrderList = action.payload;
//     // },
//     setOrderList: (state, action) => {
//       // Parse orderDetail here
//       state.OrderList = action.payload.map(order => ({
//         ...order,
//         orderDetail: JSON.parse(order.orderDetail.replace(/'/g, '"'))
//       }));
//     },
//   },
// });

// export const {setOrderList} = OderReducer.actions;

// export default OderReducer.reducer;

// //-------API Call------------
// export const CreateOrderActionAsync = (dataOrder) => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.post(
//         "${HOST_DOMAIN}/api/Users/order",
//         dataOrder
//       );
//       console.log(res.data.content);
//       const action = clearCart();
//       dispatch(action);
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

// export const GetOrderHistoryActionAsync = () => {
//   return async (dispatch) => {
//     try {
//       const res = await axios.get(
//         "${HOST_DOMAIN}/api/Order"
//       );
//       console.log(res.data.content);
//       const action = setOrderList(res.data.content);
//       dispatch(action);
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

import { createSlice } from "@reduxjs/toolkit";
import { clearCart } from "./CartReducer";
import { HOST_DOMAIN } from "../../Util/UtilFunction";
import { message } from "antd";

const initialState = {
  OrderList: [],
  OrderDetails: [],
};

const OderReducer = createSlice({
  name: "OderReducer",
  initialState,
  reducers: {
    // setOrderList: (state, action) => {
    //   state.OrderList = action.payload;
    // },
    setOrderList: (state, action) => {
      // Parse orderDetail here
      state.OrderList = action.payload.map((order) => ({
        ...order,
        orderDetail: JSON.parse(order.orderDetail.replace(/'/g, '"')),
      }));
    },
    setOrderDetail: (state, action) => {
      const { orderId, orderDetail } = action.payload;
      state.OrderDetails[orderId] = orderDetail;
    },
  },
});

export const { setOrderList, setOrderDetail } = OderReducer.actions;

export default OderReducer.reducer;

//-------API Call------------
export const CreateOrderActionAsync = (dataOrder) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${HOST_DOMAIN}/api/Users/order`,
        dataOrder
      );
      console.log(res.data.content);
      const action = clearCart();
      dispatch(action);
      message.success("Placed order successfully!");
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetOrderHistoryActionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HOST_DOMAIN}/api/Order`
      );
      console.log(res.data.content);
      const action = setOrderList(res.data.content);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};

export const GetOrderDetailActionAsync = (orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${HOST_DOMAIN}/api/Order/getOrderDetail?id=${orderId}`
      );
      const action = setOrderDetail({ orderId, orderDetail: res.data.content });
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
};
