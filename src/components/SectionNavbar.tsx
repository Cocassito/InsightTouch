import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useViewport } from "../hook/useViewport";

type Section = {
  id: string;
  label: string;
};

type SectionNavbarProps = {
  sections: Section[];
};

const SectionNavbar: React.FC<SectionNavbarProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isMobile } = useViewport();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const offsetTop = top + window.scrollY;
          const offsetBottom = bottom + window.scrollY;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const renderDesktopNavbar = () => (
    <nav className="sectionNavbar__container">
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="sectionNavbar__button"
            initial={false}
            animate={{
              width: isActive ? 120 : 25,
              height: isActive ? 40 : 25,
              borderRadius: 16,
              padding: isActive ? "0.5rem 1rem" : 0,
              border: "1px solid #f4f6f7",
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              type: "tween",
            }}
          >
            <motion.span
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : -10,
              }}
              transition={{ duration: 0.2, delay: isActive ? 0.2 : 0 }}
              className="sectionNavbar__label"
            >
              {section.label}
            </motion.span>
          </motion.button>
        );
      })}
    </nav>
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  

  const renderMobileNavbar = () => (
    <div className="sectionNavbarMobile">
      <button
        className={`burgerMenu ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Ouvrir ou fermer le menu de navigation"
        aria-expanded={isMenuOpen}
      >
        <span className="burgerMenu__dot" />
        <span className="burgerMenu__dot" />
        <span className="burgerMenu__dot" />
      </button>
  
      <nav
        className={`sectionNavbarMobile__container fullscreen-slide ${
          isMenuOpen ? "open" : "closed"
        }`}
      >
        {sections.map((section) => (
          <div
            key={section.id}
            className={`sectionNavbar__label ${
              activeSection === section.id ? "active" : ""
            }`}
            onClick={() => scrollToSection(section.id)}
          >
            <h3>{section.label}</h3>
          </div>
        ))}
      </nav>
    </div>
  );
  

  return isMobile ? renderMobileNavbar() : renderDesktopNavbar();
};

export default SectionNavbar;
