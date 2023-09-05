import { Benefit, BenefitsContainer } from "./styled";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import AvTimerIcon from "@mui/icons-material/AvTimer";

const BenefitsSection: React.FC = () => {
	return(
		<BenefitsContainer>
			<Benefit>
				<h2>Com as melhores funcionalidades 🚀</h2>
				<span>Utilize nossa solução para fins de gestão do conhecimento, onboarding de funcionários, atendimento ao cliente, produção de conteúdo, dentre outras finalidades.</span>
			</Benefit>
			<Benefit>
				<AssessmentIcon />
				<h2>Aumento da produtividade</h2>
				<span>Recursos e tempo serão alocados para que você possa direcionar seu foco a outras áreas do negócio, resultando em um aumento de produtividade.</span>
			</Benefit>
			<Benefit>
				<LightbulbIcon />
				<h2>Insights</h2>
				<span>A empresa poderá adquirir conhecimentos valiosos de forma rápida, o que contribui para aprimorar o funcionamento geral do negócio.</span>
			</Benefit>
			<Benefit>
				<AvTimerIcon />
				<h2>Eficiência</h2>
				<span>Automatização de tarefas dos processos de Recursos Humanos e de suporte interno.</span>
			</Benefit>
		</BenefitsContainer>
	);
};

export {BenefitsSection};