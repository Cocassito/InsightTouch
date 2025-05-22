const DefaultSection: React.FC = () => (
  <div
    id="defaultSection"
    style={{
      width: "100%",
      height:"auto",
      backgroundColor: "#f0f0f0",
      color: "red",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      userSelect: "none",
      opacity: 0,
      transform: "translateY(20px)",
      position: "relative",
      zIndex: 9999,
      transition: "opacity 0.3s ease",
    }}
  >
  <h1>Bienvenue sur le site !</h1>
  </div>
);
export default DefaultSection;