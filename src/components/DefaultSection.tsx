const DefaultSection: React.FC = () => (
  <div
    id="defaultSection"
    style={{
      width: "100%",
      height: "100%",
      top: "50%",
      left: "50%",
      color: "#F4F6F7",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      opacity: 1,
      position: "absolute",
      transition: "opacity 0.3s ease",
      transform: "translate(-50%, -50%)",
      flexDirection: "column",
    }}
  >
    <div style={{  width: "80%", height: "80%" }}>
      <img
        src="/img/LogoITBaseline.svg"
        alt="Logo InsightTouch"
        width="100%"
        height="100%"
      />
   
    </div>
    <div
      aria-label="Icône pour indiquer que l'utilisateur doit faire défiler la page"
      style={{
        width: "100px",
        height: "100px",
        position: "absolute",
        top: "80%",
        opacity: 0.5,
      }}
    >
      <img
        src="/img/Mouse.svg"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <img
        src="/img/ArrowBot.svg"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          animation: "floatY 2s ease-in-out infinite",
        }}
      />
      <img
        src="/img/ArrowTop.svg"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          animation: "floatY 2s ease-in-out infinite",
          animationDelay: "0.2s",
        }}
      />
    </div>

    <style>
      {`
        @keyframes floatY {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
      `}
    </style>
  </div>
);

export default DefaultSection;
