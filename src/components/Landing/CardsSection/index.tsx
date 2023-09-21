import { useTranslation } from "react-i18next";
import { fileIcons, possibleWorks, securityAndPrivacy } from "./constants";
import {
  Card,
  CardsContainer,
  Circle,
  DottedBackground,
  IconsSession,
  PromptImg,
  Row,
  ScreenShotImage,
  SecurityContainer,
  WorksContainer,
} from "./styled";

const CardsSection = () => {
  const { t } = useTranslation();
  return (
    <CardsContainer id="about-triple-ai">
      <Row>
        <Card>
          <h2>{t("pages.landing.components.cardsSection.first.title")}</h2>
          <WorksContainer>
            {possibleWorks.map((work, index) => (
              <div key={index}>
                {work.icon}
                <span>{work.description}</span>
              </div>
            ))}
          </WorksContainer>
        </Card>
        <Card>
          <h2>{t("pages.landing.components.cardsSection.second.title")}</h2>
          <SecurityContainer>
            {securityAndPrivacy.map((security, index) => (
              <div key={index}>
                <img src={security.imageUrl} alt={security.title} />
                <h3>{security.title}</h3>
              </div>
            ))}
          </SecurityContainer>
        </Card>
      </Row>
      <Row>
        <Card>
          <h2>{t("pages.landing.components.cardsSection.third.title")}</h2>
          <ScreenShotImage src="/pluginChat.png" />
          <Circle>
            <div></div>
          </Circle>
          <IconsSession>
            {fileIcons.map((icon, index) => (
              <img src={icon} key={index} />
            ))}
          </IconsSession>
        </Card>
        <Card>
          <h2>{t("pages.landing.components.cardsSection.fourth.title")}</h2>
          <PromptImg src="/prompts.png" />
          <DottedBackground />
        </Card>
      </Row>
    </CardsContainer>
  );
};

export { CardsSection };
