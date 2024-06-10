import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table, Toast } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

const HomePage = () => {
  const navigate = useNavigate();
  const [displayUsers, setDisplayUsers] = useState([]);
  const [testState, setTestState] = useState(false);
  const [show, setShow] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginCheck = () => {
    const cookieValue = document.cookie.split("=");
    const token = cookieValue[1];
    // const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!loginCheck()) {
      return;
    }
    navigate("/");
    getAllUsers();
  }, [testState, navigate]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/api");
      if (response.status === 200) {
        // console.log("All users list", response.data);
        setDisplayUsers(response.data);
      }
    } catch (error) {
      console.log("Error while getting users' lists", error);
    }
  };

  const handleCreateUserClick = () => {
    navigate("/create");
  };

  const confirmUserDelete = (userId) => {
    setUserIdToDelete(userId);
    setShow(!show);
  };

  const handleUserDelete = async () => {
    // console.log("userid", userId);
    try {
      const response = await axios.post("/api/deleteUser", {
        userId: userIdToDelete,
      });
      if (response.status === 200) {
        toast.success("User is deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTestState(!testState);
        setShow(false);
      }
    } catch (error) {
      console.log("Some error while deleting the error!", error);
    }
  };

  const handleUpdateUser = (userId) => {
    // console.log("user id for update", userId);
    navigate(`/update/${userId}`);
  };

  const handleUserLogout = () => {
    // Set the 'token' cookie value to an empty string
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate("/login");
    window.location.reload();
  };
  return (
    <>
      <Container className="w-50 mt-5">
        <div className="d-flex gap-5 align-items-center justify-content-around">
          <div className="">
            <Button
              className="fw-medium btn-success"
              onClick={handleCreateUserClick}
            >
              Create User
            </Button>
          </div>
          <div className="mx-5">
            <p className="fs-1 fw-medium ">All users</p>
          </div>
          <Button variant="secondary" onClick={handleUserLogout}>
            Logout
          </Button>
        </div>
        <Table className="mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.user_id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    className="btn-primary"
                    onClick={() => handleUpdateUser(user.user_id)}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    className="btn-danger"
                    onClick={() => confirmUserDelete(user.user_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUserDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default HomePage;
