import logo from "../Logo/logo.png";

function Logo() {
  return (
    <div
      className="logo"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          height: "180px",
        }}
      />
    </div>
  );
}

export default Logo;
