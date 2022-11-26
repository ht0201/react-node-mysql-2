import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:7000/auth", data)
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("You must input field !"),
    password: Yup.string().min(3).max(8).required("You must input field !"),
  });

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. username...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="password"
            placeholder="(Ex. password...)"
          />
          <button type="submit"> Sign up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
