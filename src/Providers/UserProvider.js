import React, { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState("u1");

  const userMap = {
    u1: { id: "u1", name: "David" },
    u2: { id: "u2", name: "Filip" },
    u3: { id: "u3", name: "Klausik" },
    u4: { id: "u4", name: "Sisi" },
  };

  const value = {
    userMap,
    userList: Object.keys(userMap).map((userId) => userMap[userId]),
    loggedInUser,
    setLoggedInUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };