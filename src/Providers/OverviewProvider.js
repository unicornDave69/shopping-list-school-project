import { createContext, useMemo, useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";

export const OverviewContext = createContext();

function OverviewProvider({ children }) {
  const [showArchived, setShowArchived] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const [shoppingLists, setShoppingLists] = useState([]);
  const [archivedLists, setArchivedLists] = useState([]);

  const [overviewList, setOverviewList] = useState([
    {
      id: "sl01",
      name: "První list",
      state: "active",
      owner: "u1",
      memberList: ["u2"],
    },
    {
      id: "sl02",
      name: "Druhý list",
      state: "archived",
      owner: "u1",
      memberList: ["u2", "u3"],
    },
    {
      id: "td04",
      name: "čtvrtý list",
      state: "archived",
      owner: "u2",
      memberList: ["u1"],
    },
  ]);

  const value = {
    shoppingLists,
    archivedLists,
    handlerMap: {
      createList: ({ name, items }) => {
        setShoppingLists((current) => [
          ...current,
          { id: `list-${Math.random()}`, name, items },
        ]);
      },
      addItemToList: ({ listId, itemName, quantity }) => {
        setShoppingLists((current) =>
          current.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: [
                    ...list.items,
                    {
                      id: `item-${Math.random()}`,
                      name: itemName,
                      quantity,
                      resolved: false,
                    },
                  ],
                }
              : list
          )
        );
      },
      deleteList: (listId) => {
        setShoppingLists((current) =>
          current.filter((list) => list.id !== listId)
        );
      },
      archiveList: (listId) => {
        setShoppingLists((current) => {
          const listToArchive = current.find((list) => list.id === listId);
          if (listToArchive) {
            setArchivedLists((archived) => [...archived, listToArchive]);
            return current.filter((list) => list.id !== listId);
          }
          return current;
        });
      },
      toggleResolveItem: ({ listId, itemId }) => {
        setShoppingLists((current) =>
          current.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((item) =>
                    item.id === itemId
                      ? { ...item, resolved: !item.resolved }
                      : item
                  ),
                }
              : list
          )
        );
      },
      deleteItem: ({ listId, itemId }) => {
        setShoppingLists((current) =>
          current.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.filter((item) => item.id !== itemId),
                }
              : list
          )
        );
      },
    },
  };

  function handleCreate() {
    setOverviewList((current) => [
      ...current,
      {
        id: `sl${Math.random()}`,
        name: "Nový list",
        state: "active",
        owner: loggedInUser,
        memberList: [],
      },
    ]);
  }

  function handleArchive(dtoIn) {
    setOverviewList((current) => {
      const itemIndex = current.findIndex((item) => item.id === dtoIn.id);
      current[itemIndex] = { ...current[itemIndex], state: "archived" };
      return [...current];
    });
  }

  function handleDelete(dtoIn) {
    setOverviewList((current) =>
      current.filter((item) => item.id !== dtoIn.id)
    );
  }

  const filteredToDoListList = useMemo(() => {
    return overviewList.filter((item) =>
      showArchived
        ? item.owner === loggedInUser || item.memberList.includes(loggedInUser)
        : item.state === "active" &&
          (item.owner === loggedInUser ||
            item.memberList.includes(loggedInUser))
    );
  }, [showArchived, overviewList, loggedInUser]);

  return (
    <OverviewContext.Provider
      value={{
        showArchived,
        setShowArchived,
        filteredToDoListList,
        handleCreate,
        handleArchive,
        handleDelete,
        ...value, // Merging both contexts
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
}

export default OverviewProvider;
