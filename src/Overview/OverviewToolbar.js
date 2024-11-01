import React, { useState, useContext } from "react";
import { OverviewContext } from "../Providers/OverviewProvider";
import { UserContext } from "../Providers/UserProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosArchive } from "react-icons/io";
import { Dropdown, Table } from "react-bootstrap";

function Toolbar() {
  const {
    handleCreate,
    handleDelete,
    handleArchive,
    filteredOV,
    showArchived,
    setShowArchived,
  } = useContext(OverviewContext);
  const { loggedInUser, userMap } = useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  const currentUser = userMap[loggedInUser];

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowConfirmModal = (list) => {
    setListToDelete(list);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  const confirmDelete = () => {
    if (listToDelete) {
      handleDelete(listToDelete.id);
    }
    handleCloseConfirmModal();
  };

  const handleSelect = (userId) => {
    setSelectedMembers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      }
      return [...prev, userId];
    });
  };

  const handleSaveList = () => {
    const newList = {
      id: `sl${Math.random()}`,
      name: listName,
      owner: loggedInUser,
      memberList: selectedMembers,
    };
    handleCreate(newList);
    handleCloseModal();
  };

  const showDetail = (list) => {
    setSelectedList(list);
    setShowTable(true);
  };

  return (
    <Container>
      <div className="welcome">
        <h4>Welcome, {currentUser.name}!</h4>
      </div>

      <div className="icons">
        <CiCirclePlus
          onClick={handleShowModal}
          style={{ cursor: "pointer", color: "green" }}
        />
        <IoIosArchive
          onClick={() => setShowArchived((prev) => !prev)}
          style={{
            cursor: "pointer",
            color: showArchived ? "orange" : "black",
          }}
        />
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
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-members">
                Vyber členy
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.entries(userMap).map(
                  ([userId, user]) =>
                    userId !== loggedInUser && (
                      <Dropdown.Item
                        key={userId}
                        onClick={() => handleSelect(userId)}
                        active={selectedMembers.includes(userId)}
                      >
                        {user.name}
                      </Dropdown.Item>
                    )
                )}
              </Dropdown.Menu>
            </Dropdown>
            <div className="mt-3">
              {selectedMembers.length > 0 && (
                <div>
                  <strong>Členové:</strong>
                  <ul>
                    {selectedMembers.map((userId) => (
                      <li key={userId}>{userMap[userId].name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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

      {/* Potvrzovací modální okno pro mazání seznamu */}
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Potvrzení smazání</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Opravdu chcete smazat seznam "{listToDelete?.name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmModal}>
            Zrušit
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Smazat
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mt-4">
        {filteredOV.map(
          (list, index) =>
            (list.memberList.includes(loggedInUser) ||
              list.owner === loggedInUser) && (
              <Col key={index} sm={6} md={4} lg={3}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>{list.name}</Card.Title>
                    {list.owner === loggedInUser ? (
                      <>
                        <Button
                          variant="danger"
                          onClick={() => handleShowConfirmModal(list)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() => handleArchive(list.id)}
                        >
                          Archive
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => showDetail(list)}
                        >
                          Detail
                        </Button>
                      </>
                    ) : list.memberList.includes(loggedInUser) ? (
                      <Button
                        variant="primary"
                        onClick={() => showDetail(list)}
                      >
                        Detail
                      </Button>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
            )
        )}
      </Row>
      {showTable && selectedList && (
        <>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Název Seznamu</th>
                <th>Vlastník</th>
                <th>Členové</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedList.id}</td>
                <td>{selectedList.name}</td>
                <td>{userMap[selectedList.owner]?.name}</td>
                <td>
                  {selectedList.memberList
                    .map((userId) => userMap[userId]?.name)
                    .join(", ")}
                </td>
              </tr>
            </tbody>
          </Table>
          <Button variant="secondary" onClick={() => setShowTable(false)}>
            Hide detail
          </Button>
        </>
      )}
    </Container>
  );
}

export default Toolbar;
