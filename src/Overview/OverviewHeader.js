import { useContext } from "react";
import { UserContext } from "../Providers/UserProvider.js";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";

function Header() {
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100vw",
        paddingTop: "30px",
        paddingRight: "40px",
      }}
    >
      <Dropdown>
        <Dropdown.Toggle
          as="div"
          variant="success"
          id="dropdown-basic"
          style={{
            border: "green",
            padding: 0,
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
  );
}

export default Header;
