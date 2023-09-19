import { useTranslation } from "react-i18next";
import { List, PartnersListContainer } from "./styled";

const LandingPartners: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PartnersListContainer>
      <h2>{t("pages.landing.components.partners.title")}</h2>
      <List>
        <li>
          <img src="/partners/microsoft.png" alt="Microsoft Logo" />
        </li>
        <li style={{ display: "none" }}>
          <img src="/partners/aws.png" alt="AWS Logo" />
        </li>
        <li>
          <img src="/partners/google.png" alt="Google Logo" />
        </li>
      </List>
    </PartnersListContainer>
  );
};

export { LandingPartners };
