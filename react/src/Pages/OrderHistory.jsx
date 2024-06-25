// import React, { useEffect } from "react";
// import "../Style/OrderHistory.css";
// import { useDispatch, useSelector } from "react-redux";
// import { GetOrderDetailActionAsync, GetOrderHistoryActionAsync } from "../Redux/Reducers/OderReducer";

// const OrderHistory = () => {
//   const { OrderList, OrderDetails } = useSelector((state) => state.OderReducer);
//   console.log(OrderList);
//   console.log(OrderDetails)
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const actionAsync = GetOrderHistoryActionAsync();
//     dispatch(actionAsync);
//   }, []);

//   useEffect(() => {
//     OrderList.forEach(order => {
//       dispatch(GetOrderDetailActionAsync(order.id));
//     });
//   }, [OrderList, dispatch]);

//   return (
//     <div className="container">
//       <h2>Order History</h2>
//       {OrderList.map((order) => (
//         <div key={order.id}>
//           <div className="order-date">
//             Orders have been placed on {new Date(order.date).toLocaleDateString()}
//           </div>
//           <table className="table table-bordered table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>id</th>
//                 <th>img</th>
//                 <th>name</th>
//                 <th>price</th>
//                 <th>quantity</th>
//                 <th>total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {OrderDetails[order.id] && OrderDetails[order.id].orderDetail.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index+1}</td>
//                   <td>
//                     <img src={item.image} alt={item.name} style={{ width: "50px", borderRadius: "50%" }} />
//                   </td>
//                   <td>{item.name}</td>
//                   <td>{item.price}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.price * item.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrderHistory;

import React, { useEffect, useState } from "react";
import "../Style/OrderHistory.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetOrderDetailActionAsync,
  GetOrderHistoryActionAsync,
} from "../Redux/Reducers/OderReducer";

const OrderHistory = () => {
  const { OrderList, OrderDetails } = useSelector((state) => state.OderReducer);
  console.log(OrderList);
  console.log(OrderDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    const actionAsync = GetOrderHistoryActionAsync();
    dispatch(actionAsync);
  }, []);

  useEffect(() => {
    OrderList.forEach((order) => {
      dispatch(GetOrderDetailActionAsync(order.id));
    });
  }, [OrderList, dispatch]);


  //----------------Pagination--------------
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Số lượng đơn hàng trên mỗi trang
  // Tính toán số trang
  const totalPages = Math.ceil(OrderList.length / itemsPerPage);

  // Xử lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = OrderList.slice(indexOfFirstItem, indexOfLastItem);

  // Chuyển đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2>Order History</h2>
      {currentOrders.map((order) => (
        <div key={order.id}>
          <div className="order-date">
            Orders have been placed on{" "}
            {new Date(order.date).toLocaleDateString()}
          </div>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>id</th>
                <th>img</th>
                <th>name</th>
                <th>price</th>
                <th>quantity</th>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              {OrderDetails[order.id] &&
                OrderDetails[order.id].orderDetail.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "50px", borderRadius: "50%" }}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
      {/* Phân trang */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default OrderHistory;
