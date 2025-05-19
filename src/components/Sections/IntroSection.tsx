import { SectionComponentProps } from "../../data/sections";

const IntroSection = ({ id }: SectionComponentProps) => (
  <section id={id} style={{ minHeight: "100vh", padding: "2rem" }}>
    <h2>Intro</h2>
  </section>
);

export default IntroSection;
