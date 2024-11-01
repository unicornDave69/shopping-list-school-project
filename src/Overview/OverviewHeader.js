import { useContext } from "react";
import { UserContext } from "../Providers/UserProvider.js";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../Logo/logo.png";

function Header() {
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);

  return (
    <div className="header">
      <div className="logo">
        <img
          src={logo}
          alt="Logo"
          style={{
            height: "180px",
            paddingTop: "20px",
          }}
        />

        <Dropdown
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100vw",
            paddingRight: "40px",
          }}
        >
          <Dropdown.Toggle
            as="div"
            variant="success"
            id="dropdown-basic"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaRegUserCircle size={60} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {userList.map((user) => (
              <Dropdown.Item
                key={user.id}
                onClick={() => setLoggedInUser(user.id)}
              >
                {user.name} {user.id === loggedInUser ? "(current)" : ""}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
