import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  Input,
  Button,
  Badge,
  theme,
  Avatar,
  Dropdown,
  Space,
  message,
} from "antd";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons"; // Import icon giỏ hàng
import "../../Style/TempUI.css"; // Thêm một file CSS để tùy chỉnh
import { useSelector, useDispatch } from "react-redux"; // Import useSelector hook
import {
  TOKEN_AUTHOR,
  USER_LOGIN,
  getDataJSONStorage,
  removeDataTextStorage,
} from "../../Util/UtilFunction";
import {
  clearCart,
  setCartLocalStorage,
} from "../../Redux/Reducers/CartReducer";
import { logoutAction } from "../../Redux/Reducers/UsersReducer";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const items1 = [
  { key: "Trang chủ", label: <NavLink to="/">Home</NavLink> },
  { key: "Liên hệ", label: <NavLink to="/">Contact</NavLink> },
];

const TemplateUI = () => {
  const { cart } = useSelector((state) => state.CartReducer);
  const { userLogin } = useSelector((state) => state.UsersReducer);
  const totalItem = cart.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOrder, setFilterOrder] = useState("");

  useEffect(() => {
    // Khôi phục dữ liệu từ localStorage khi component mount
    const storedCart = getDataJSONStorage("cart");
    if (storedCart) {
      const action = setCartLocalStorage(storedCart);
      dispatch(action);
    }
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleMenuClick = (e) => {
    setFilterOrder(e.key);
  };

  const handleSignOut = () => {
    removeDataTextStorage(TOKEN_AUTHOR);
    removeDataTextStorage(USER_LOGIN);
    navigate("/");
    const action = logoutAction();
    dispatch(action);
    dispatch(clearCart());
    message.success("Bạn đã đăng xuất!");
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="up">Price low to high</Menu.Item>
      <Menu.Item key="down">Price high to low</Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" style={{ color: "red" }} onClick={handleSignOut}>
        Logout
      </Menu.Item>
    </Menu>
  );

  // Generate breadcrumb items based on the current location
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <NavLink to="/">Home</NavLink>
    </Breadcrumb.Item>,
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const breadcrumbName = url.substring(url.lastIndexOf("/") + 1);
      return (
        <Breadcrumb.Item key={url}>
          <NavLink to={url}>
            {breadcrumbName.charAt(0).toUpperCase() + breadcrumbName.slice(1)}
          </NavLink>
        </Breadcrumb.Item>
      );
    }),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Đảm bảo các phần tử được căn đều
        }}
      >
        <div
          className="header-content"
          style={{
            padding: "0 50px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img
              src="https://cdn.discordapp.com/attachments/1188390482137595904/1254820800566132806/image.png?ex=667ae270&is=667990f0&hm=a05b21aa91be38d7dc8a2b19a7057b3430247886c078d2b748c32a5903ef3c80&"
              alt="Logo"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{
              flex: 1,
              justifyContent: "center",
              display: "flex",
            }}
          />
          <div className="header-right d-flex align-items-center">
            <Search
              placeholder="Search..."
              onSearch={handleSearch}
              style={{ width: 200, marginRight: "1rem" }} // Điều chỉnh khoảng cách bằng giá trị rem
            />
            <Dropdown overlay={menu} className="me-2">
              <Button>
                <Space>
                  Search by price
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            {userLogin ? (
              <Dropdown overlay={userMenu}>
                <Avatar
                  style={{ backgroundColor: "#003366", marginLeft: "1rem" }}
                  icon={<UserOutlined />}
                />
              </Dropdown>
            ) : (
              <Button
                type="primary"
                className="me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
            <NavLink to="/cart" className="ms-2">
              {" "}
              {/* Sử dụng margin-start để tạo khoảng cách */}
              <Badge count={totalItem} className="ms-2">
                <Avatar
                  style={{ backgroundColor: "#003366" }}
                  shape="square"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                />
              </Badge>
            </NavLink>
          </div>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 50px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          {breadcrumbItems}
        </Breadcrumb>
        <div
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Outlet context={{ searchTerm, filterOrder }} />
          </Content>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Cybersoft Store {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default TemplateUI;
