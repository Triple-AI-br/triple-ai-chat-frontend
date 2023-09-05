import { fileIcons, possibleWorks, securityAndPrivacy } from "./contants";
import { Card, CardsContainer, Circle, DottedBackground, IconsSession, PromptImg, Row, ScreenShotImage, SecurityContainer, WorksContainer } from "./styled";

const CardsSection: React.FC = () => {
	return (
		<CardsContainer>
			<Row>

				<Card>
					<h2>O que é possível fazer?</h2>
					<WorksContainer>
						{possibleWorks.map((work, index) => (
							<div key={index}>
								{work.icon}
								<span>{work.description}</span>
							</div>
						))}
					</WorksContainer>
				</Card>
				<Card>
					<h2>Nossos requisitos de segurança e privacidade</h2>
					<SecurityContainer>
						{
							securityAndPrivacy.map((security, index) => (
								<div key={index}>
									<img src={security.imageUrl} alt={security.title} />
									<h3>{security.title}</h3>
								</div>
							))
						}
					</SecurityContainer>
				</Card>
			</Row>
			<Row>
				<Card>
					<h2>Faça upload de arquivos e pergunte qualquer coisa</h2>
					<ScreenShotImage src="/chatscreenshot.png"/>
					<Circle>
						<div></div>
					</Circle>
					<IconsSession>
						{
							fileIcons.map((icon, index) => (
								<img src={icon} key={index} />
							))
						}
					</IconsSession>
				</Card>
				<Card>
					<h2>Gereciador de Prompts com centenas de modelos prontos para uso</h2>
					<PromptImg src="/prompts.png" />
					<DottedBackground />
				</Card>
			</Row>
		</CardsContainer>
	);
};

export {CardsSection};