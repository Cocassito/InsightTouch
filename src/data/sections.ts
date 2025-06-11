import CasUsage from "../components/Sections/CasUsage";
import FeaturesSection from "../components/Sections/FeaturesSection";
import IntroSection from "../components/Sections/IntroSection";
import PortabilitySection from "../components/Sections/PortabilitySection";

export type SectionComponentProps = {
  id: string;
};

export type Section = {
  id: string;
  label: string;
  component: React.FC<SectionComponentProps>;
};

export const sections = [
  { id: "section1", label: "Présentation", component: IntroSection },
  { id: "section2", label: "Fonctionnalité", component: FeaturesSection },
  { id: "section3", label: "Dimensions", component: PortabilitySection },
  { id: "section4", label: "Cas d'usages", component: CasUsage },
];

