import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../../utils/useWindowSize";
import { ActionButton, HeaderContainer, LogoImg, NavElements } from "./styled";
import MenuIcon from "@mui/icons-material/Menu";
import { routesManager } from "../../../routes/routesManager";

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
      <ActionButton type="primary" onClick={() => navigate(routesManager.getProjectsRoute())}>
        Testar gratuitamente
      </ActionButton>
      <MenuIcon sx={{ display: isDesktop ? "none" : "inline-block" }} />
    </HeaderContainer>
  );
};

export { LandingHeader };
