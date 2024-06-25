import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetProductByIdActionAsync } from "../Redux/Reducers/ProductReducer";
import { addToCart } from "../Redux/Reducers/CartReducer";
import { message } from "antd";

const ShowProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;
  const { userLogin } = useSelector((state) => state.UsersReducer);
  const { detailProductById } = useSelector((state) => state.ProductReducer);
  console.log(detailProductById);

  const getDetailProductById = async () => {
    const actionAsync = GetProductByIdActionAsync(id);
    dispatch(actionAsync);
  };

  useEffect(() => {
    getDetailProductById();
    window.scrollTo(0, 0);
    setQuantity(1);
  }, [id]);

  // const handleAddToCart = () => {
  //   const action = addToCart({
  //     ...detailProductById,
  //     quantity: parseInt(quantity),
  //   });
  //   dispatch(action);
  //   message.success("Đã thêm sản phẩm vào giỏ hàng!");
  // };

  const handleAddToCart = () => {
    if (!userLogin) {
      message.error(
        "You are not logged in. Please log in to add products to cart."
      );
      return;
    }

    const action = addToCart({
      ...detailProductById,
      quantity: parseInt(quantity),
    });
    dispatch(action);
    message.success("Product added to cart!");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={detailProductById?.image || "default-image.jpg"}
            className="img-fluid"
            alt="Product"
          />
        </div>
        <div className="col-md-6">
          <h2>{detailProductById?.name}</h2>
          <p>{detailProductById?.description}</p>
          <h5>Available size</h5>
          <div>
            {detailProductById?.size.map((size, index) => (
              <button key={index} className="btn btn-outline-secondary me-2">
                {size}
              </button>
            ))}
          </div>
          <h4 className="mt-3">${detailProductById?.price}</h4>
          <div className="d-flex align-items-center">
            <input
              type="number"
              className="form-control w-25 me-2"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              min={1}
            />
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3>Related Products</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {detailProductById?.relatedProducts.map((product, idx) => (
            <div className="col" key={idx}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt="Product"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
                <div className="card-footer">
                  <NavLink
                    className="btn btn-warning"
                    to={`/product-detail/${product.id}`}
                  >
                    View detail
                  </NavLink>
                  <span className="ms-2">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowProductDetail;
