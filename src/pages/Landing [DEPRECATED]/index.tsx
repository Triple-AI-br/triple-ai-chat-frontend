import { FirstSection } from "../../components/Landing [DEPRECATED]";
import { LandingHeader } from "../../components/Landing [DEPRECATED]/Header";
import { ScrollPage } from "./styled";
import { CardsSection } from "../../components/Landing [DEPRECATED]/CardsSection";
import { BenefitsSection } from "../../components/Landing [DEPRECATED]/BenefitsSection";
import { LandingPageFooter } from "../../components/Landing [DEPRECATED]/Footer";
import { LandingPartners } from "../../components/Landing [DEPRECATED]/Partners";
import { ExamplesUsage } from "../../components/Landing [DEPRECATED]/ExamplesUsage";
import "./index.css";
import { useEffect, useState } from "react";

function LandingPage() {
  const [hiddenElements, setHiddenElements] = useState(document.querySelectorAll(".hidden"));

  useEffect(() => {
    const hidden = document.querySelectorAll(".hidden");
    setHiddenElements(hidden);
  }, []);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  hiddenElements.forEach((el) => observer.observe(el));

  return (
    <ScrollPage>
      <LandingHeader />
      <FirstSection />
      <LandingPartners />
      <ExamplesUsage />
      <CardsSection />
      <BenefitsSection />
      <LandingPageFooter />
    </ScrollPage>
  );
}

export { LandingPage };
