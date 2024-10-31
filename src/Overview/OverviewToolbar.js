import React, { useState, useContext } from "react";
import { OverviewContext } from "../Providers/OverviewProvider";
import { UserContext } from "../Providers/UserProvider";
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
  const {
    handleCreate,
    handleDelete,
    handleArchive,
    filteredToDoListList,
    showArchived,
    setShowArchived,
  } = useContext(OverviewContext);
  const { loggedInUser, userMap } = useContext(UserContext);

  // Define local state for modal and form fields
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const currentUser = userMap[loggedInUser];

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setListName("");
    setItems([]);
    setSelectedMembers([]);
  };

  const handleAddItem = () => {
    if (itemName && itemQuantity) {
      setItems([...items, { name: itemName, quantity: itemQuantity }]);
      setItemName("");
      setItemQuantity("");
    }
  };

  const handleSaveList = () => {
    handleCreate({
      id: `sl${Math.random()}`,
      name: listName,
      state: "active",
      owner: loggedInUser,
      memberList: selectedMembers,
      items,
    });
    handleCloseModal();
  };

  return (
    <Container>
      <h4>Welcome, {currentUser.name}!</h4>
      <div className="icons">
        <CiSquarePlus onClick={handleShowModal} />
        <IoIosArchive onClick={() => filteredToDoListList()} />
      </div>
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
                onChange={(e) => setItemName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formItemQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter quantity (e.g., 2)"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
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

            <Form.Group controlId="formMembers">
              <Form.Label>Members</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={selectedMembers}
                onChange={(e) => {
                  const value = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setSelectedMembers(value);
                }}
              >
                {Object.entries(userMap).map(
                  ([userId, user]) =>
                    userId !== loggedInUser && (
                      <option key={userId} value={userId}>
                        {user.name}
                      </option>
                    )
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveList}>
            Save List
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mt-4">
        {filteredToDoListList.map(
          (list, index) =>
            (list.memberList.includes(loggedInUser) ||
              list.owner === loggedInUser) && (
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
                        {list.items?.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {list.owner === loggedInUser && (
                      <>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(list.id)}
                        >
                          Delete
                        </Button>

                        <Button
                          variant="warning"
                          onClick={() => handleArchive(list.id)}
                        >
                          Archive
                        </Button>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            )
        )}
      </Row>
    </Container>
  );
}

export default Toolbar;
