import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const { setAuthState } = useContext(AuthContext);

  const onLogin = (data) => {
    axios
      .post("http://localhost:7000/auth/login", data)
      .then((res) =>
      {
        if (res.data.error)
        {
          alert(res.data.error)
        } else
        {
          localStorage.setItem('accessToken', res.data.accessToken);
          setAuthState(true);
          navigate("/");
        }
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
        onSubmit={onLogin}
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
          <button type="submit"> Log in</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
