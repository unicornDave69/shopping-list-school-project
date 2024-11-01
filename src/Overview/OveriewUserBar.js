import { useContext } from "react";
import { UserContext } from "../Providers/UserProvider.js";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";

function UserBar() {
  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  return (
    <Dropdown
      style={{
        display: "flex",
        alignItems: "center",
        paddingRight: "10px",
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
          <Dropdown.Item key={user.id} onClick={() => setLoggedInUser(user.id)}>
            {user.name} {user.id === loggedInUser ? "(current)" : ""}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserBar;
