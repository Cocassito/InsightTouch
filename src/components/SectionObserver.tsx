import { useEffect } from "react";

type Section = {
  id: string;
};
type Props = {
  sections: Section[];
  onChangeSection: (id: string | null) => void;  // on accepte aussi null
};

const SectionObserver: React.FC<Props> = ({ sections, onChangeSection }) => {
  useEffect(() => {
    const handleScroll = () => {
      // Position du milieu de la fenêtre par rapport au haut du document
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Si on est avant la première section (en haut de la page)
      if (sections.length > 0) {
        const firstSection = document.getElementById(sections[0].id);
        if (firstSection) {
          const firstSectionTop = firstSection.offsetTop;
          if (scrollPosition < firstSectionTop) {
            // En haut, avant la première section
            onChangeSection(null);
            return; // on stoppe la recherche
          }
        }
      }

      // Sinon, on cherche la section visible sous le milieu de l'écran
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            onChangeSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // appel initial pour définir la section active au chargement

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, onChangeSection]);

  return null;
};

export default SectionObserver;
