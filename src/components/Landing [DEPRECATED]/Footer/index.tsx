/* eslint-disable no-case-declarations */
import { Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import {
  ActionButton,
  BottomContainer,
  ButtonsContainer,
  CalendlyButton,
  CenterContainer,
  FooterContainer,
  Line,
  LogoImg,
  RightsContainer,
  SocialMidias,
  TopContainer,
} from "./styled";
import { PrivacyTerms } from "../PrivacyTerms";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";
import { useTranslation } from "react-i18next";

const WPP_URL =
  "http://api.whatsapp.com/send?phone=5527981213951&text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20Triple%20AI,%20e%20como%20podem%20ajudar%20a%20minha%20empresa.";

const LandingPageFooter = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const element = event.currentTarget as HTMLButtonElement;
    switch (element.name) {
      case "email":
        const mailto =
          "mailto:fundadores@tripleai.com.br?subject=Informações sobre a Triple AI&body=Olá, %0D%0A %0D%0A Gostaria de saber como os produtos da Triple AI podem ajudar a minha empresa a faturar mais. %0D%0A %0D%0A Obrigado.";
        window.location.href = mailto;
        break;
      case "whatsapp":
        window.open(WPP_URL, "_blank", "noreferrer");
        break;
      case "execute":
        navigate(routesManager.getProjectsRoute());
        break;
      default:
        return;
    }
  };

  return (
    <FooterContainer id="landing-footer">
      <TopContainer>
        <ButtonsContainer>
          <CalendlyButton
            text={t("pages.landing.components.actionBtn")}
            url="https://calendly.com/eduardotripleai/30min"
            rootElement={document.getElementById("root") as HTMLElement}
          />
          <ActionButton
            type="primary"
            name="email"
            actiontype="secondary"
            onClick={(e) => handleClick(e)}
          >
            fundadores@tripleai.com.br
          </ActionButton>
          <ActionButton
            type="primary"
            name="whatsapp"
            actiontype="secondary"
            onClick={(e) => handleClick(e)}
          >
            (27) 98121-3951
          </ActionButton>
          <PrivacyTerms />
        </ButtonsContainer>
        <SocialMidias>
          <ul>
            <li>
              <a href="https://www.instagram.com/tripleaibr/?hl=pt" target="blank">
                <Instagram />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/tripleaibr/" target="blank">
                <LinkedIn />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@TripleAI_" target="blank">
                <YouTube />
              </a>
            </li>
          </ul>
        </SocialMidias>
        <CenterContainer>
          <CalendlyButton
            text={t("pages.landing.components.actionBtn")}
            url="https://calendly.com/eduardotripleai/30min"
            rootElement={document.getElementById("root") as HTMLElement}
          />
          <LogoImg src="/triple-ai.png" alt="logo" />
        </CenterContainer>
      </TopContainer>
      <BottomContainer>
        <Line />
        <RightsContainer>
          <span>{t("pages.landing.components.footer.copyright")}</span>
          <div></div>
          <span>{t("pages.landing.components.footer.designBy")}</span>
        </RightsContainer>
      </BottomContainer>
    </FooterContainer>
  );
};

export { LandingPageFooter };
