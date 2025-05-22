import FeaturesSection from "../components/Sections/FeaturesSection";
import IntroSection from "../components/Sections/IntroSection";

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
];

