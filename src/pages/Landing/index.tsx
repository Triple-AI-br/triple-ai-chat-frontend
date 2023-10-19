import { FirstSection } from "../../components/Landing";
import { LandingHeader } from "../../components/Landing/Header";
import { ScrollPage } from "./styled";
import { CardsSection } from "../../components/Landing/CardsSection";
import { BenefitsSection } from "../../components/Landing/BenefitsSection";
import { LandingPageFooter } from "../../components/Landing/Footer";
import { LandingPartners } from "../../components/Landing/Partners";
import { ExamplesUsage } from "../../components/Landing/ExamplesUsage";
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
