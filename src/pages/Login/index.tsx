import { useTranslation } from "react-i18next";
import {
  ActionButton,
  Circles,
  Content,
  LeftCallToAction,
  LeftVisualContainer,
  LoginPageBackground,
} from "./styled";
import { LoginForm } from "../../components/Login/Form";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LoginPageBackground>
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
            <h3>Não tem acesso?</h3>
            <span>Entre em contato!</span>
            <ActionButton
              text={t("pages.landing.components.actionBtn")}
              url="https://calendly.com/eduardo-tripleai/30min"
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
