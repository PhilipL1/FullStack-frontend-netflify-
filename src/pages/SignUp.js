import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  //data == values from the input in the UI
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
      navigate("/login");
    });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label> Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost" // UI == design of the box in Css
            name="username"
            placeholder="Ex. Username... "
          />
          <label> Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreatePost"
            name="password"
            placeholder="Your Password Silly!"
            type="password"
          />
          <button type="submit"> Create Account</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUp;
