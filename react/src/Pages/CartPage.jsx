import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../Redux/Reducers/CartReducer";
import ModalConfirmOrder from "../Modal/ModalConfirmOrder";
import { message } from "antd";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.CartReducer);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    message.success("Product removed");
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    message.success("Cart deleted");
  };

  return (
    <div className="container">
      <h1>Carts</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "50px", borderRadius: "50%" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => handleDecrementQuantity(item.id)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="form-control text-center"
                        style={{ width: "50px" }}
                      />
                      <button
                        className="btn btn-outline-primary btn-sm ms-2"
                        onClick={() => handleIncrementQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <h4>Total Price: ${totalPrice}</h4>
            <div>
              <button
                className="btn btn-outline-success btn-sm me-2"
                data-bs-toggle="modal"
                data-bs-target="#modalOrder"
              >
                Submit Order
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
      <ModalConfirmOrder />
    </div>
  );
};

export default CartPage;
