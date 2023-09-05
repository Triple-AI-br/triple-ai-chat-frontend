import { UseWindowSize } from "../../../utils/useWindowSize";
import { ActionButton, FirstSectionContainer, LeftContainer, PlataformGif, Subtitle, Title, VectorImage } from "./styled";

const DESKTOP_WIDTH = 600;

function FirstSection() {
	const { width } = UseWindowSize();

	const isDesktop = width >= DESKTOP_WIDTH;

	return (
		<FirstSectionContainer>
			<VectorImage src={isDesktop ? "/VectorDesktop.svg" : "/Vector.svg"} alt="vector image" />
			<LeftContainer>
				<Title>
				CRIE O <span>CHATGPT</span> DA SUA EMPRESA
				</Title>
				<Subtitle>
				Automatize tarefas operacionais e torne sua empresa mais eficiente com o nosso copiloto inteligente.
				</Subtitle>
				<ActionButton type="primary" >Quero falar com um especialista</ActionButton>
			</LeftContainer>
			<PlataformGif>
			</PlataformGif>
		</FirstSectionContainer>
	);
}

export { FirstSection };
