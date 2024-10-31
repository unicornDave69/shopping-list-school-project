import { createContext, useMemo, useState, useContext } from "react";
import { UserContext } from "./UserProvider.js";

export const OverviewContext = createContext();

function OverviewProvider({ children }) {
  const { loggedInUser } = useContext(UserContext);
  const [shoppingLists, setShoppingLists] = useState([]);
  const [archivedLists, setArchivedLists] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [selectedListId, setSelectedListId] = useState(null); // ID vybraného seznamu

  // Vytvoření nového nákupního seznamu
  const handleCreate = ({ id, name, owner, memberList, items }) => {
    setShoppingLists((current) => [
      ...current,
      { id, name, owner, memberList, items },
    ]);
  };

  // Archivace nákupního seznamu
  const handleArchive = (listId) => {
    setShoppingLists((current) => {
      const listToArchive = current.find((list) => list.id === listId);
      if (listToArchive) {
        setArchivedLists((archived) => [...archived, listToArchive]);
        return current.filter((list) => list.id !== listId);
      }
      return current;
    });
  };

  // Smazání nákupního seznamu
  const handleDelete = (listId) => {
    setShoppingLists((current) => current.filter((list) => list.id !== listId));
  };

  // Výběr seznamu pro zobrazení detailu
  const handleSelectList = (listId) => {
    setSelectedListId(listId);
  };

  // Přidání položky do seznamu
  const handleAddItem = (listId, item) => {
    setShoppingLists((current) => {
      const listIndex = current.findIndex((list) => list.id === listId);
      const updatedList = { ...current[listIndex] };
      updatedList.items.push(item);
      const updatedShoppingLists = [...current];
      updatedShoppingLists[listIndex] = updatedList;
      return updatedShoppingLists;
    });
  };

  // Odebrání položky ze seznamu
  const handleDeleteItem = (listId, itemId) => {
    setShoppingLists((current) => {
      const listIndex = current.findIndex((list) => list.id === listId);
      const updatedList = { ...current[listIndex] };
      updatedList.items = updatedList.items.filter(
        (item) => item.id !== itemId
      );
      const updatedShoppingLists = [...current];
      updatedShoppingLists[listIndex] = updatedList;
      return updatedShoppingLists;
    });
  };

  // Změna názvu seznamu
  const handleUpdateName = (listId, name) => {
    setShoppingLists((current) => {
      const listIndex = current.findIndex((list) => list.id === listId);
      const updatedList = { ...current[listIndex], name };
      const updatedShoppingLists = [...current];
      updatedShoppingLists[listIndex] = updatedList;
      return updatedShoppingLists;
    });
  };

  // Přidání člena
  const handleAddMember = (listId, memberId) => {
    setShoppingLists((current) => {
      const listIndex = current.findIndex((list) => list.id === listId);
      const updatedList = { ...current[listIndex] };
      if (!updatedList.memberList.includes(memberId)) {
        updatedList.memberList.push(memberId);
      }
      const updatedShoppingLists = [...current];
      updatedShoppingLists[listIndex] = updatedList;
      return updatedShoppingLists;
    });
  };

  // Odebrání člena
  const handleRemoveMember = (listId, memberId) => {
    setShoppingLists((current) => {
      const listIndex = current.findIndex((list) => list.id === listId);
      const updatedList = { ...current[listIndex] };
      updatedList.memberList = updatedList.memberList.filter(
        (member) => member !== memberId
      );
      const updatedShoppingLists = [...current];
      updatedShoppingLists[listIndex] = updatedList;
      return updatedShoppingLists;
    });
  };

  // Filtrování seznamů
  const filteredToDoListList = useMemo(() => {
    return shoppingLists.filter((list) =>
      showArchived
        ? list.owner === loggedInUser || list.memberList.includes(loggedInUser)
        : list.owner === loggedInUser || list.memberList.includes(loggedInUser)
    );
  }, [showArchived, shoppingLists, loggedInUser]);

  return (
    <OverviewContext.Provider
      value={{
        showArchived,
        setShowArchived,
        shoppingLists,
        filteredToDoListList,
        handleCreate,
        handleArchive,
        handleDelete,
        handleSelectList,
        handleAddItem,
        handleDeleteItem,
        handleUpdateName,
        handleAddMember,
        handleRemoveMember,
        selectedListId,
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
}

export default OverviewProvider;
