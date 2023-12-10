import { Button, Checkbox, Form, Input } from "antd";
import { FormContainer, Logo } from "./styled";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { actionLogin, selectIsAuthenticated } from "../../../redux/authenticationSlice";
import { routesManager } from "../../../routes/routesManager";
import { authService } from "../../../services";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "../GoogleLogin";

type FieldType = {
  email: string;
  password: string;
  remember?: boolean;
};

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: FieldType) => {
    try {
      setLoading(true);
      if (forgotPassword) {
        await authService.requestPasswordReset(values.email);
        dispatch(
          actionDisplayNotification({
            messages: [t("pages.login.requestPasswordResetMessage")],
            severity: "success",
          }),
        );
        setForgotPassword(false);
      } else {
        await dispatch(actionLogin(values));
      }
    } catch (er) {
      dispatch(
        actionDisplayNotification({
          messages: [t("global.failureToLogin")],
          severity: "error",
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(false);
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
          <Form.Item noStyle>
            <Form.Item<FieldType>
              name="email"
              label={t("pages.login.requestPasswordReset")}
              rules={[{ type: "email", required: true, message: t("pages.login.emailRequired") }]}
            >
              <Input
                disabled={loading}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item>
              <a
                className="login-form-forgot"
                style={{ display: "inline-block" }}
                onClick={() => setForgotPassword(false)}
              >
                {t("pages.login.iAlreadyHaveAnAccount")}
              </a>
            </Form.Item>
          </Form.Item>
        ) : (
          <>
            <Form.Item<FieldType>
              name="email"
              rules={[
                { required: true, message: t("pages.login.emailRequired") },
                { type: "email", message: t("pages.login.correctEmail") },
              ]}
            >
              <Input
                disabled={loading}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[{ required: true, message: t("pages.login.passwordRequired") }]}
            >
              <Input.Password
                disabled={loading}
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder={t("pages.login.password")}
              />
            </Form.Item>

            <Form.Item noStyle>
              <Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t("pages.login.remember")}</Checkbox>
              </Form.Item>

              <Form.Item>
                <a
                  className="login-form-forgot"
                  style={{ display: "inline-block" }}
                  onClick={() => setForgotPassword(true)}
                >
                  {t("pages.login.forgotPassword")}
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
            loading={loading}
            style={{ width: "100%" }}
          >
            {forgotPassword ? t("global.submit") : t("global.login")}
          </Button>
        </Form.Item>
        <div
          style={{
            marginTop: 30,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <GoogleLogin />
        </div>
      </Form>
    </FormContainer>
  );
};

export { LoginForm };
