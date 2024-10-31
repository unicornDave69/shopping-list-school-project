import React, { useState, useContext } from "react";
import { OverviewContext } from "../Providers/OverviewProvider";
import { UserContext } from "../Providers/UserProvider"; // Import UserContext
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
    handleArchive,
    handleDelete,
    filteredToDoListList,
    showArchived,
    setShowArchived,
  } = useContext(OverviewContext);
  const { loggedInUser, userMap } = useContext(UserContext);
  const currentUser = userMap[loggedInUser];

  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setListName("");
    setItems([]);
  };

  const handleAddItem = () => {
    if (itemName && itemQuantity) {
      setItems([...items, { name: itemName, quantity: itemQuantity }]);
      setItemName("");
      setItemQuantity("");
    }
  };

  const handleSaveList = () => {
    if (listName && items.length > 0) {
      handleCreate({ name: listName, items });
      handleCloseModal();
    }
  };

  return (
    <Container>
      <h4>Welcome, {currentUser.name}!</h4>
      <CiSquarePlus onClick={handleShowModal} />
      <IoIosArchive onClick={() => setShowArchived(!showArchived)} />

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
        {filteredToDoListList.map((list, index) => (
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
                    <Button variant="danger" onClick={() => handleDelete(list)}>
                      Delete
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleArchive(list)}
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

      <Modal show={showArchived} onHide={() => setShowArchived(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Archived Lists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* You can replace this with your archived lists display logic */}
          <p>No archived lists</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowArchived(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Toolbar;
