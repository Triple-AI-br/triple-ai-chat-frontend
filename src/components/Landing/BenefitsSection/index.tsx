import { Benefit, BenefitsContainer, Container } from "./styled";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { useTranslation } from "react-i18next";

const BenefitsSection = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <BenefitsContainer>
        <Benefit>
          <h2>{t("pages.landing.components.benefits.first.title")}</h2>
          <span>{t("pages.landing.components.benefits.first.subtitle")}</span>
        </Benefit>
        <Benefit>
          <AssessmentIcon />
          <h2>{t("pages.landing.components.benefits.second.title")}</h2>
          <span>{t("pages.landing.components.benefits.second.subtitle")}</span>
        </Benefit>
        <Benefit>
          <LightbulbIcon />
          <h2>{t("pages.landing.components.benefits.third.title")}</h2>
          <span>{t("pages.landing.components.benefits.third.subtitle")}</span>
        </Benefit>
        <Benefit>
          <AvTimerIcon />
          <h2>{t("pages.landing.components.benefits.fourth.title")}</h2>
          <span>{t("pages.landing.components.benefits.fourth.subtitle")}</span>
        </Benefit>
      </BenefitsContainer>
    </Container>
  );
};

export { BenefitsSection };
