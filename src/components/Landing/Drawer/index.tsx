import { Button, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";
import { ActionButton } from "../Header/styled";
import { DrawerContainer, Navigator, RightsContainer } from "./styled";
import { useTranslation } from "react-i18next";

type LandingDrawerProps = {
  onClose: () => void;
  open: boolean;
};

const LandingDrawer: React.FC<LandingDrawerProps> = ({ onClose, open }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Drawer
      title={t("pages.landing.components.drawerTitle")}
      placement="right"
      onClose={onClose}
      open={open}
      bodyStyle={{ position: "relative" }}
    >
      <DrawerContainer>
        <Button type="link" onClick={() => navigate(routesManager.getProjectsRoute())}>
          {t("pages.landing.components.header.loginBtn")}
        </Button>
        <ActionButton
          text={t("pages.landing.components.actionBtn")}
          url="https://calendly.com/eduardo-tripleai/30min"
          rootElement={document.getElementById("root") as HTMLElement}
        ></ActionButton>
        <Navigator>
          <Button type="text" onClick={onClose}>
            <a href="#first-section">{t("pages.landing.components.header.navLinks.home")}</a>
          </Button>
          <Button type="text" onClick={onClose}>
            <a href="#about-triple-ai">{t("pages.landing.components.header.navLinks.aboutUs")}</a>
          </Button>
          <Button type="text" onClick={onClose}>
            <a href="#landing-footer">{t("pages.landing.components.header.navLinks.contacts")}</a>
          </Button>
        </Navigator>
      </DrawerContainer>
      <RightsContainer>
        <span>{t("pages.landing.components.footer.copyright")}</span>
        <span>{t("pages.landing.components.footer.designBy")}</span>
      </RightsContainer>
    </Drawer>
  );
};

export { LandingDrawer };
