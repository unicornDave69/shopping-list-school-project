import { useContext } from "react";
import { UserContext } from "../Providers/UserProvider.js";
import Dropdown from "react-bootstrap/Dropdown";

function Header() {
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select a user
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
