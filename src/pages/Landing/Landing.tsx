import { FirstSection } from "../../components/Landing";
import { LandingHeader } from "../../components/Landing/Header";
import { ScrollPage } from "./styled";
import { CardsSection } from "../../components/Landing/CardsSection";
import { BenefitsSection } from "../../components/Landing/BenefitsSection";
import { LandingPageFooter } from "../../components/Landing/Footer";
import { LandingPartners } from "../../components/Landing/Partners";

function LandingPage() {
  return (
    <ScrollPage>
      <LandingHeader />
      <FirstSection />
      <LandingPartners />
      <CardsSection />
      <BenefitsSection />
      <LandingPageFooter />
    </ScrollPage>
  );
}

export { LandingPage };
