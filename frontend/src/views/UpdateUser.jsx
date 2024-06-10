import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showData, setShowData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const getDataToUpdateUser = async () => {
    try {
      const response = await axios.get(`/api/update/${userId}`);
      if (response.status === 200) {
        // console.log("Response successfull", response.data);
        setShowData(response.data);
      }
    } catch (error) {
      console.log("Error while getting user data", error);
    }
  };

  useEffect(() => {
    getDataToUpdateUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateUser = async () => {
    try {
      const response = await axios.put(`/api/update/${userId}`, {
        firstName: showData.first_name,
        lastName: showData.last_name,
        email: showData.email,
      });
      if (response.status === 200) {
        // console.log("User is updated!", response);
        navigate("/");
      }
    } catch (error) {
      console.log("Error in update user api", error);
    }
  };

  return (
    <>
      <div className="mt-5">
        <p className="text-center fs-1 fw-semibold">Update User</p>
      </div>
      <Container className="w-50 d-flex align-items-center justify-content-center">
        <Form className="w-50">
          <div className="mt-4">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John"
              name="first_name"
              value={showData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Doe"
              name="last_name"
              value={showData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="johndoe@gmail.com"
              value={showData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-3">
            <Button className="fw-medium w-100" onClick={updateUser}>
              Update
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default UpdateUser;
