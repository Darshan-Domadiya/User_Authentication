import React from "react";
import { Formik, ErrorMessage } from "formik";
import { Button, Container, Form } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const defaultValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email!").required("* Email is required"),
    password: yup
      .string()
      .required("* Password is required")
      .min(6, "Password should be length of atleast 6 characters!"),
  });

  const userLoginWithToken = async (values) => {
    try {
      const response = await axios.post("/api/login", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        // console.log("User logged in and exists!", response);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 404 || error.response.status === 500) {
        toast.warn("Invalid Username or Password!", {
          position: "top-center",
          autoClose: 1000,
        });
        navigate("/login");
      }
      // console.log("Error while getting the user details", error);
      navigate("/login");
    }
  };

  return (
    <>
      <Container className="w-50 mt-5 d-flex align-items-center justify-content-center flex-column">
        <div className="d-flex align-items-center justify-content-center gap-5">
          <div className="mx-5 text-center">
            <span className="text-center fs-1 fw-semibold mx-5">Login</span>
          </div>
        </div>
        <Formik
          initialValues={defaultValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            userLoginWithToken(values);
            // console.log("user login values", values);
          }}
        >
          {({ handleChange, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit} className="w-50">
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
                    Login
                  </Button>
                </div>

                <div className="mt-3 text-center ">
                  <Button
                    className="fw-medium w-100"
                    onClick={() => navigate("/signup")}
                  >
                    SignUp
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Container>
      {}
    </>
  );
};

export default Login;
