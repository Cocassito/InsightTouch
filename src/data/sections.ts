import CasUsage from "../components/Sections/CasUsage";
import ContactSection from "../components/Sections/ContactSection";
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
  labelTimeline: string;
};

export const sections: Section[] = [
  {
    id: "section1",
    label: "Présentation",
    component: IntroSection,
    labelTimeline: "intro",
  },
  {
    id: "section2",
    label: "Fonctionnalité",
    component: FeaturesSection,
    labelTimeline: "features",
  },
  {
    id: "section3",
    label: "Dimensions",
    component: PortabilitySection,
    labelTimeline: "dimension",
  },
  {
    id: "section4",
    label: "Cas d'usages",
    component: CasUsage,
    labelTimeline: "usage",
  },
  {
    id: "section5",
    label: "Contact",
    component: ContactSection,
    labelTimeline: "contact",
  },
];
