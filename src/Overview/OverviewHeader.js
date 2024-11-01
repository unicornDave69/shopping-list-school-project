// Header.js
import Logo from "./OverviewLogo.js";
import UserBar from "./OveriewUserBar.js";

function Header() {
  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "10px",
      }}
    >
      <div style={{ width: "100px" }}></div>
      <Logo />
      <UserBar />
    </div>
  );
}

export default Header;
