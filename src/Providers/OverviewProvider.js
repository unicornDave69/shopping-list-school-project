import { createContext, useMemo, useState } from "react";

export const OverviewContext = createContext();

function OverviewProvider({ children }) {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCreate = ({ id, name, owner, memberList = [], items }) => {
    setShoppingLists((current) => [
      ...current,
      { id, name, owner, memberList, items, status: "active" },
    ]);
    setShowModal(false);
  };

  const handleArchive = (listId) => {
    setShoppingLists((current) => {
      const listToArchive = current.find((list) => list.id === listId);
      if (listToArchive) {
        listToArchive.status = "archived";
      }
      return [...current];
    });
  };

  const handleDelete = (listId) => {
    setShoppingLists((current) => current.filter((list) => list.id !== listId));
  };

  const handleSelectList = (listId) => {
    setSelectedListId(listId);
  };

  const filteredOV = useMemo(() => {
    return shoppingLists.filter((list) =>
      showArchived ? list.status === "archived" : list.status === "active"
    );
  }, [showArchived, shoppingLists]);

  return (
    <OverviewContext.Provider
      value={{
        showArchived,
        setShowArchived,
        shoppingLists,
        filteredOV,
        handleCreate,
        handleArchive,
        handleDelete,
        handleSelectList,
        selectedListId,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
}

export default OverviewProvider;
