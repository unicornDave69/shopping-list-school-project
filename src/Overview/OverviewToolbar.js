<<<<<<< HEAD
import React, { useState, useContext } from "react";
import { UserContext } from "../Providers/UserProvider";
=======
import { useState, useContext } from "react";
import { OverviewContext } from "../Providers/OverviewProvider";
import { UserContext } from "../Providers/UserProvider"; // Import UserContext
>>>>>>> 6600597 (OverviewProvider)
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosArchive } from "react-icons/io";

function Toolbar() {
<<<<<<< HEAD
  const { loggedInUser, userMap } = useContext(UserContext);
  const currentUser = userMap[loggedInUser];

  const [showModal, setShowModal] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
=======
  const {
    handleCreate,
    handleArchive,
    handleDelete,
    filteredToDoListList,
    showArchived,
    setShowArchived,
  } = useContext(OverviewContext);
  const { loggedInUser } = useContext(UserContext); // Použití UserContextu pro získání loggedInUser

  const [showModal, setShowModal] = useState(false);
>>>>>>> 6600597 (OverviewProvider)
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
<<<<<<< HEAD
  const [shoppingLists, setShoppingLists] = useState([]);
  const [archivedLists, setArchivedLists] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setListName("");
    setItems([]);
  };

  const handleShowArchive = () => setShowArchive(true);
  const handleCloseArchive = () => setShowArchive(false);

  const handleAddItem = () => {
    if (itemName && itemQuantity) {
      setItems([...items, { name: itemName, quantity: itemQuantity }]);
      setItemName("");
      setItemQuantity("");
    }
  };

  const handleSaveList = () => {
    if (listName && items.length > 0) {
      setShoppingLists((prevLists) => [
        ...prevLists,
        { name: listName, items, owner: loggedInUser },
      ]);
      handleCloseModal();
    }
  };

  const handleDeleteList = (index) => {
    setShoppingLists(shoppingLists.filter((_, i) => i !== index));
  };

  const handleArchiveList = (index) => {
    const listToArchive = shoppingLists[index];
    setArchivedLists((prevArchived) => [...prevArchived, listToArchive]);
    handleDeleteList(index);
  };

  const handleItemNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setItemName(value);
    }
  };

  const handleItemQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setItemQuantity(value);
    }
  };

  return (
    <Container>
      <h4>Welcome, {currentUser.name}!</h4>
      <CiSquarePlus variant="success" onClick={handleShowModal} />
      <IoIosArchive variant="secondary" onClick={handleShowArchive} />
=======

  function handleShowModal() {
    setShowModal(true);
  }
  function handleCloseModal() {
    setShowModal(false);
  }
  function handleAddItem() {
    setItems([...items, { name: itemName, quantity: itemQuantity }]);
    setItemName("");
    setItemQuantity("");
  }

  return (
    <Container>
      <CiSquarePlus onClick={handleShowModal} />
      <IoIosArchive onClick={() => setShowArchived(!showArchived)} />

>>>>>>> 6600597 (OverviewProvider)
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Shopping List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formListName">
              <Form.Label>List Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter list name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </Form.Group>

            <hr />

            <Form.Group controlId="formItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={itemName}
<<<<<<< HEAD
                onChange={handleItemNameChange}
=======
                onChange={(e) => setItemName(e.target.value)}
>>>>>>> 6600597 (OverviewProvider)
              />
            </Form.Group>
            <Form.Group controlId="formItemQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quantity (e.g., 2)"
                value={itemQuantity}
<<<<<<< HEAD
                onChange={handleItemQuantityChange}
=======
                onChange={(e) => setItemQuantity(e.target.value)}
>>>>>>> 6600597 (OverviewProvider)
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddItem} className="mt-2">
              Add Item
            </Button>

            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
<<<<<<< HEAD
          <Button variant="primary" onClick={handleSaveList}>
=======
          <Button
            variant="primary"
            onClick={() => handleCreate({ name: listName, items })}
          >
>>>>>>> 6600597 (OverviewProvider)
            Save List
          </Button>
        </Modal.Footer>
      </Modal>
<<<<<<< HEAD
      <Row className="mt-4">
        {shoppingLists.map((list, index) => (
=======

      <Row className="mt-4">
        {filteredToDoListList.map((list, index) => (
>>>>>>> 6600597 (OverviewProvider)
          <Col key={index} sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{list.name}</Card.Title>
                <Table bordered size="sm">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
<<<<<<< HEAD
                    {list.items.map((item, idx) => (
=======
                    {list.items?.map((item, idx) => (
>>>>>>> 6600597 (OverviewProvider)
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {list.owner === loggedInUser && (
                  <>
<<<<<<< HEAD
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteList(index)}
                      className="me-2"
                    >
=======
                    <Button variant="danger" onClick={() => handleDelete(list)}>
>>>>>>> 6600597 (OverviewProvider)
                      Delete
                    </Button>
                    <Button
                      variant="warning"
<<<<<<< HEAD
                      onClick={() => handleArchiveList(index)}
=======
                      onClick={() => handleArchive(list)}
>>>>>>> 6600597 (OverviewProvider)
                    >
                      Archive
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
<<<<<<< HEAD
      <Modal show={showArchive} onHide={handleCloseArchive}>
        <Modal.Header closeButton>
          <Modal.Title>Archived Lists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {archivedLists.length > 0 ? (
            archivedLists.map((list, index) => (
              <Card key={index} className="mb-3">
                <Card.Body>
                  <Card.Title>{list.name}</Card.Title>
                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No archived lists</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseArchive}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
=======
>>>>>>> 6600597 (OverviewProvider)
    </Container>
  );
}

export default Toolbar;
