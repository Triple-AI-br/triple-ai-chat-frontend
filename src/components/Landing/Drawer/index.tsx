import { Button, Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";
import { ActionButton } from "../FirstSection/styled";
import { DrawerContainer, Navigator, RightsContainer } from "./styled";

type LandingDrawerProps = {
  onClose: () => void;
  open: boolean;
};

const LandingDrawer: React.FC<LandingDrawerProps> = ({ onClose, open }) => {
  const navigate = useNavigate();
  return (
    <Drawer
      title="Navegação"
      placement="right"
      onClose={onClose}
      open={open}
      bodyStyle={{ position: "relative" }}
    >
      <DrawerContainer>
        <Button type="link" onClick={() => navigate(routesManager.getProjectsRoute())}>
          Entrar / Login
        </Button>
        <ActionButton
          text="Agende uma demo"
          url="https://calendly.com/eduardo-tripleai/30min"
          rootElement={document.getElementById("root") as HTMLElement}
        ></ActionButton>
        <Navigator>
          <Button type="text" onClick={onClose}>
            <a href="#first-section">Home</a>
          </Button>
          <Button type="text" onClick={onClose}>
            <a href="#about-triple-ai">Sobre nós</a>
          </Button>
          <Button type="text" onClick={onClose}>
            <a href="#landing-footer">Contatos</a>
          </Button>
        </Navigator>
      </DrawerContainer>
      <RightsContainer>
        <span>© Triple AI. Todos os direitos reservados.</span>
        <div></div>
        <span>Design por Triple AI</span>
      </RightsContainer>
    </Drawer>
  );
};

export { LandingDrawer };
