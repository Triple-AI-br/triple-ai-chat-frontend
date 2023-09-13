import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../../utils/useWindowSize";
import { HeaderContainer, LogoImg, NavElements } from "./styled";
import { ActionButton } from "../FirstSection/styled";
import MenuIcon from "@mui/icons-material/Menu";
import { routesManager } from "../../../routes/routesManager";
import { Button } from "antd";

const DESKTOP_WIDTH = 600;

const LandingHeader = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const isDesktop = width >= DESKTOP_WIDTH;

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

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <ActionButton
          text="Agende uma demo"
          url="https://calendly.com/eduardo-tripleai/30min"
          rootElement={document.getElementById("root") as HTMLElement}
        ></ActionButton>

        <Button type="link" onClick={() => navigate(routesManager.getProjectsRoute())}>
          Entrar / Login
        </Button>
      </div>

      <MenuIcon sx={{ display: isDesktop ? "none" : "inline-block" }} />
    </HeaderContainer>
  );
};

export { LandingHeader };
