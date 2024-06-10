import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
import "./createuser.scss";

const CreateUser = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const createNewUser = async (values) => {
    try {
      const response = await axios.post("/api/createUser", {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        toast.success("User is created!", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        // console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      } else {
        console.log("Some error while creating a new user", error);
      }
    }
  };

  // Validation.
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const errorMessageSchema = yup.object().shape({
    firstName: yup.string().required("* FirstName is required"),
    lastName: yup.string().required("*LastName is required"),
    email: yup.string().email("Invalid Email!").required("* Email is required"),
    password: yup
      .string()
      .required("* Password is required")
      .min(6, "Password should be length of atleast 6 characters!"),
  });

  return (
    <>
      <Container className="w-50 mt-5 d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex align-items-center gap-5">
          <div className="">
            <span className="text-center fs-1 fw-semibold mx-4">
              Create User
            </span>
          </div>
        </div>
        <Formik
          initialValues={defaultValues}
          validationSchema={errorMessageSchema}
          onSubmit={(values) => {
            createNewUser(values);
          }}
        >
          {({ handleChange, handleSubmit, values }) => {
            return (
              <Form onSubmit={handleSubmit} className="w-50">
                <div className="mt-4">
                  <Form.Label className="fw-semibold">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="error-div"
                  />
                </div>

                <div className="mt-2">
                  <Form.Label className="fw-semibold">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Doe"
                    name="lastName"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error-div"
                  />
                </div>

                <div className="mt-2">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="johndoe@gmail.com"
                    name="email"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-div"
                  />
                </div>

                <div className="mt-2">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-div"
                  />
                </div>

                <div className="mt-3 text-center ">
                  <Button className="fw-medium w-100" type="submit">
                    Submit
                  </Button>
                </div>
                <div>
                  <Button className="w-100 mt-2 fw-medium" onClick={() => navigate("/")}>Back</Button>
                </div>
                {/* {errors.length > 0 && (
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error.msg}</li>
                    ))}
                  </ul>
                )}
                 */}
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default CreateUser;
