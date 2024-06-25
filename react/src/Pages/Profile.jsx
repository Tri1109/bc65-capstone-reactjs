import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  GetInfoProfileActionAsync,
  GetProductFavoriteActionAsync,
  UpdateProfileActionAsync,
} from "../Redux/Reducers/ProfileReducer";
import { NavLink, useNavigate } from "react-router-dom";
import { UnLikeProductActionAsync } from "../Redux/Reducers/ProductReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileInfo, productFavorite } = useSelector(
    (state) => state.ProfileReducer
  );
  const [isEditing, setIsEditing] = useState(false);

  const getInfo = () => {
    const action = GetInfoProfileActionAsync(navigate);
    dispatch(action);
  };

  const getProductFavorite = () => {
    const action = GetProductFavoriteActionAsync(navigate);
    dispatch(action);
  };

  useEffect(() => {
    getInfo();
    getProductFavorite();
  }, []);

  const handleUpdate = () => {
    setIsEditing(true); // Hiển thị form chỉnh sửa
  };

  const handleCancel = () => {
    formUpdate.resetForm(); // Đặt lại giá trị form
    setIsEditing(false); // Ẩn form chỉnh sửa
  };

  const formUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: profileInfo?.email || "",
      name: profileInfo?.name || "",
      phone: profileInfo?.phone || "",
      gender: profileInfo?.gender ? "true" : "false",
    },
    onSubmit: (values) => {
      console.log(values);
      const action = UpdateProfileActionAsync(values);
      dispatch(action);
      setIsEditing(false);
      formUpdate.resetForm();
    },
  });

  const handleUnLike = (id) => {
    return () => {
      const action = UnLikeProductActionAsync(id);
      dispatch(action);
    };
  };

  //--------------Pagination--------------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Số lượng đơn hàng trên mỗi trang
  // Tính toán số trang
  const totalPages = Math.ceil(
    profileInfo?.ordersHistory?.length / itemsPerPage
  );

  // Xử lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders =
    profileInfo?.ordersHistory?.slice(indexOfFirstItem, indexOfLastItem) || [];

  // Chuyển đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 d-flex flex-column align-items-center ">
          <img
            src={profileInfo?.avatar}
            alt="Profile"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="col-md-9">
          <h2>Profile</h2>
          <form onSubmit={formUpdate.handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={formUpdate.values.email}
                  onChange={formUpdate.handleChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formUpdate.values.name}
                  onChange={formUpdate.handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formUpdate.values.phone}
                  onChange={formUpdate.handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Gender</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="true"
                      checked={formUpdate.values.gender === "true"}
                      onChange={formUpdate.handleChange}
                      disabled={!isEditing}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="false"
                      checked={formUpdate.values.gender === "false"}
                      onChange={formUpdate.handleChange}
                      disabled={!isEditing}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {isEditing ? (
              <div>
                <button type="submit" className="btn btn-success mr-2 me-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link active"
              href="#order-history"
              data-bs-toggle="tab"
            >
              Order history
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#favourite" data-bs-toggle="tab">
              Favourite
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="order-history">
            <div className="order-history mt-4">
              {currentOrders.map((order, index) => (
                <div key={index}>
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
                      {order.orderDetail?.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>
                            <img
                              src={
                                item.image || "https://via.placeholder.com/50"
                              }
                              alt="Product"
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
                      <button
                        onClick={() => paginate(index + 1)}
                        className="page-link"
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="tab-pane fade " id="favourite">
            {/* <p>Favourite content here...</p> */}
            <div className="row row-cols-1 row-cols-md-3 g-4 pt-4">
              {productFavorite.map((productLike) => (
                <div className="col-4" key={productLike.id}>
                  <div className="card h-100">
                    <img
                      src={productLike.image}
                      className="card-img-top"
                      alt={productLike.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{productLike.name}</h5>
                    </div>
                    <div className="favorite">
                      <button onClick={handleUnLike(productLike.id)}>
                        <i
                          className="fas fa-heart-broken"
                          style={{ fontSize: "24px" }}
                        />
                      </button>
                    </div>
                    <div className="card-footer">
                      <NavLink
                        className="btn btn-buy"
                        to={`/product-detail/${productLike.id}`}
                      >
                        View detail
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
