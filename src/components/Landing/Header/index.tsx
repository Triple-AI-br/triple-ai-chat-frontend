import { UseWindowSize } from "../../../utils/useWindowSize";
import { ActionButton, HeaderContainer, LogoImg, NavElements } from "./styled";
import MenuIcon from "@mui/icons-material/Menu";

const DESKTOP_WIDTH = 600;

const LandingHeader: React.FC = () => {
	const { width } = UseWindowSize();
	const isDesktop = width >= DESKTOP_WIDTH;

	return (
		<HeaderContainer bottomScroll={false}>
			<LogoImg src='/triple-ai.png' />
			<NavElements>
				<li>Home</li>
				<li>Sobre nós</li>
				<li>Contatos</li>
			</NavElements>
			<ActionButton type="primary" >
			Testar gratuitamente
			</ActionButton>
			<MenuIcon sx={{display: isDesktop ? "none" : "inline-block"}} />
		</HeaderContainer>
	);
};

export {LandingHeader};