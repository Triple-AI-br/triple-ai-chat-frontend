import { useNavigate } from "react-router-dom";
import { ActionContainer, HeaderContainer, LogoImg, NavElements } from "./styled";
import { ActionButton } from "../FirstSection/styled";
import MenuIcon from "@mui/icons-material/Menu";
import { routesManager } from "../../../routes/routesManager";
import { Button } from "antd";
import { useState } from "react";
import { LandingDrawer } from "../Drawer";

const LandingHeader = () => {
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
      <LogoImg src="/triple-ai.png" />
      <NavElements>
        <li>
          <a href="#first-section">Home</a>
        </li>
        <li>
          <a href="#about-triple-ai">Sobre nós</a>
        </li>
        <li>
          <a href="#landing-footer">Contatos</a>
        </li>
      </NavElements>
      <LandingDrawer onClose={onClose} open={open} />
      <ActionContainer style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <ActionButton
          text="Agende uma demo"
          url="https://calendly.com/eduardo-tripleai/30min"
          rootElement={document.getElementById("root") as HTMLElement}
        ></ActionButton>

        <Button type="link" onClick={() => navigate(routesManager.getProjectsRoute())}>
          Entrar / Login
        </Button>

        <MenuIcon onClick={showDrawer} />
      </ActionContainer>
    </HeaderContainer>
  );
};

export { LandingHeader };
