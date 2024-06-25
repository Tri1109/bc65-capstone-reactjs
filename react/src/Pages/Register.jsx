import React from "react";
import {
  Button,
  Form,
  Grid,
  Input,
  Select,
  theme,
  Typography,
  message,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  IdcardOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupActionApi } from "../Redux/Reducers/UsersReducer";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const Register = () => {
  const { token } = useToken();
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log("Received values of form: ", values);
      const signupActionThunk = signupActionApi(values);
      await dispatch(signupActionThunk);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.warning("Vui lòng kiểm tra lại thông tin đăng kí.");
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.paddingXL}px ${token.padding}px`,
      width: "380px",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: screens.sm ? "100vh" : "auto",
      padding: screens.md ? `${token.sizeXXL}px 0px` : "0px",
    },
    signup: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.125" width="32" height="32" rx="6.4" fill="#1890FF" />
            <path
              d="M19.3251 4.80005H27.3251V12.8H19.3251V4.80005Z"
              fill="white"
            />
            <path d="M12.925 12.8H19.3251V19.2H12.925V12.8Z" fill="white" />
            <path d="M4.92505 17.6H14.525V27.2001H4.92505V17.6Z" fill="white" />
          </svg>

          <Title style={styles.title}>Sign up</Title>
          <Text style={styles.text}>
            Join us! Create an account to get started.
          </Text>
        </div>
        <Form
          name="normal_signup"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            extra="Mật khẩu tối đa 8 kí tự."
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              { max: 8, message: "Mật khẩu quá dài!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select your Gender!",
              },
            ]}
          >
            <Select placeholder="Gender">
              <Select.Option value="true">Male</Select.Option>
              <Select.Option value="false">Female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^\d+$/,
                message: "Please input a valid phone number!",
              },
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button block type="primary" htmlType="submit">
              Sign up
            </Button>
            <div style={styles.signup}>
              <Text style={styles.text}>Already have an account?</Text>{" "}
              <NavLink to="/">Sign in</NavLink>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Register;
