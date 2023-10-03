/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Form, Input } from "antd";
import { FormContainer, Logo } from "./styled";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actionLogin, selectIsAuthenticated } from "../../../redux/authenticationSlice";
import { routesManager } from "../../../routes/routesManager";

type FieldType = {
  email: string;
  password: string;
  remember?: boolean;
};

const LoginForm: React.FC = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const onFinish = async (values: FieldType) => {
    if (forgotPassword) {
      setForgotPassword(false);
    } else {
      await dispatch(actionLogin(values));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const next =
        location.state && location.state.next
          ? location.state.next
          : routesManager.getProjectsRoute();
      navigate(next);
    }
  }, [isAuthenticated]);

  return (
    <FormContainer>
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout={forgotPassword ? "vertical" : "horizontal"}
        autoComplete="off"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        <Logo alt="logo" src="/triple-ai.png" />
        {forgotPassword ? (
          <Form.Item<FieldType>
            name="email"
            label="Request password reset"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
        ) : (
          <>
            <Form.Item<FieldType>
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item noStyle>
              <Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <a
                  className="login-form-forgot"
                  style={{ display: "inline-block" }}
                  onClick={() => setForgotPassword(true)}
                >
                  Forgot password
                </a>
              </Form.Item>
            </Form.Item>
          </>
        )}
        <Form.Item noStyle>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            {forgotPassword ? "Submit" : "Log in"}
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export { LoginForm };
