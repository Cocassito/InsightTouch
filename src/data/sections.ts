import FeaturesSection from "../components/Sections/FeaturesSection";
import IntroSection from "../components/Sections/IntroSection";

export type SectionComponentProps = {
  id: string;
};

export const sections = [
  { id: "section1", label: "Présentation", component: IntroSection },
  { id: "section2", label: "Fonctionnalité", component: FeaturesSection },
];
