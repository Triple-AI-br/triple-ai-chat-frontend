import { FirstSection } from "../../components/Landing";
import { LandingHeader } from "../../components/Landing/Header";
import { ScrollPage } from "./styled";
import { CardsSection } from "../../components/Landing/CardsSection";
import { BenefitsSection } from "../../components/Landing/BenefitsSection";
import { LandingPageFooter } from "../../components/Landing/Footer";
import { LandingPartners } from "../../components/Landing/Partners";
import { ExamplesUsage } from "../../components/Landing/ExamplesUsage";

function LandingPage() {
  return (
    <ScrollPage>
      <LandingHeader />
      <FirstSection />
      <LandingPartners />
      <CardsSection />
      <ExamplesUsage />
      <BenefitsSection />
      <LandingPageFooter />
    </ScrollPage>
  );
}

export { LandingPage };
