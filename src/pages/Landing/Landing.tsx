import { FirstSection } from "../../components/Landing";
import {LandingHeader} from "../../components/Landing/Header";
import { LandingPageContainer, ScrollPage } from "./styled";
import { CardsSection } from "../../components/Landing/CardsSection";
import { BenefitsSection } from "../../components/Landing/BenefitsSection";
import { LandingPageFooter } from "../../components/Landing/Footer";

function LandingPage() {

	return (
		<LandingPageContainer>
			<ScrollPage>
				<LandingHeader />
				<FirstSection />
				<CardsSection />
				<BenefitsSection />
				<LandingPageFooter />
			</ScrollPage>
		</LandingPageContainer>
	);
}

export { LandingPage };
