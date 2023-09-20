import { useNavigate } from "react-router-dom";
import { ActionButton, ActionContainer, HeaderContainer, LogoImg, NavElements } from "./styled";
import MenuIcon from "@mui/icons-material/Menu";
import { routesManager } from "../../../routes/routesManager";
import { Button } from "antd";
import { useState } from "react";
import { LandingDrawer } from "../Drawer";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "../LanguageSelector";

const LandingHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <HeaderContainer bottomScroll={false}>
      <LandingDrawer onClose={onClose} open={open} />
      <LogoImg src="/triple-ai.png" />
      <NavElements>
        <li>
          <a href="#first-section">{t("pages.landing.components.header.navLinks.home")}</a>
        </li>
        <li>
          <a href="#about-triple-ai">{t("pages.landing.components.header.navLinks.aboutUs")}</a>
        </li>
        <li>
          <a href="#landing-footer">{t("pages.landing.components.header.navLinks.contacts")}</a>
        </li>
      </NavElements>
      <ActionContainer style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <ActionButton
          text={t("pages.landing.components.actionBtn")}
          url="https://calendly.com/eduardo-tripleai/30min"
          rootElement={document.getElementById("root") as HTMLElement}
        ></ActionButton>
        <Button type="link" onClick={() => navigate(routesManager.getProjectsRoute())}>
          {t("pages.landing.components.header.loginBtn")}
        </Button>
        <LanguageSelector />
        <MenuIcon onClick={showDrawer} />
      </ActionContainer>
    </HeaderContainer>
  );
};

export { LandingHeader };
