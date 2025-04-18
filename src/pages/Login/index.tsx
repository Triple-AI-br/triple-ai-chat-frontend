import { useTranslation } from "react-i18next";
import {
  ActionButton,
  CircleFive,
  CircleFour,
  CircleOne,
  CircleSix,
  CircleThree,
  CircleTwo,
  Circles,
  Content,
  LeftCallToAction,
  LeftVisualContainer,
  LoginPageBackground,
} from "./styled";
import { LoginForm } from "../../components/Login/Form";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { selectError } from "../../redux/authenticationSlice";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (error) {
      dispatch(
        actionDisplayNotification({
          messages: [error],
          severity: "error",
        }),
      );
    }
  }, [error]);

  return (
    <LoginPageBackground>
      <CircleOne />
      <CircleTwo />
      <CircleThree />
      <CircleFour />
      <CircleFive />
      <CircleSix />
      <Content>
        <LeftVisualContainer>
          <Circles>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </Circles>
          <LeftCallToAction>
            <h3>{t("pages.login.components.leftContent.noAccess")}</h3>
            <span>{t("pages.login.components.leftContent.contactUs")}</span>
            <ActionButton
              text={t("pages.landing.components.actionBtn")}
              url="https://calendly.com/eduardotripleai/30min"
              rootElement={document.getElementById("root") as HTMLElement}
            ></ActionButton>
          </LeftCallToAction>
        </LeftVisualContainer>
        <LoginForm />
      </Content>
    </LoginPageBackground>
  );
};

export { LoginPage };
