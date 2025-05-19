import IntroSection from "../components/Sections/IntroSection";

export type SectionComponentProps = {
  id: string;
};

export const sections = [
  { id: "section1", label: "Introduction", component: IntroSection },
];
