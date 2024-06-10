import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import * as yup from "yup";
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const userSignUp = async (values) => {
    try {
      const response = await axios.post("/api/signup", {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        // console.log("User is created!", response);
        navigate("/login");
      }
    } catch (error) {
      // console.log("Error while signup", error);
    }
  };

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
      <Container className="w-50 mt-5 d-flex align-items-center justify-content-center flex-column">
        <div className="d-flex align-items-center justify-content-center gap-5">
          <span className="text-center fs-1 fw-semibold mx-5">Signup</span>
        </div>
        <Formik
          initialValues={defaultValues}
          validationSchema={errorMessageSchema}
          onSubmit={(values) => {
            userSignUp(values);
            // console.log("signup values", values);
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
                    SignUp
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default Signup;
