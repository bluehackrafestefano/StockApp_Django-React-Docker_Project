import "../styles/login.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Img from "../assets/result.svg";
import {useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../context/AuthContext";

function Register() {
    const navigate=useNavigate()
    console.log("merhaba")
    const {createUser} = React.useContext(AuthContext)

  const validationsRegister = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Email invalid").required("Email is required"),
    first_name:yup.string().required("First Name is required"),
    last_name:yup.string().required("Last Name is required"),
    password: yup
    .string()
    .min(8,"Şifre en az 8 karakter olmalıdır")
    .max(12)
    .matches(/\d+/,"Şifre en az bir sayı içermelidir")
    .matches(/[a-z]+/,"Şifre en az bir küçük harf içermelidir.")
    .matches(/[A-Z]+/,"Şifre en az bir büyük harf içermelidir.")
    .matches(/[!,?{}><%&$#£+-.]+/, 'Sifreniz ozel karakterlerden (!,?{}><%&$#£+-.) en az birini icermelidir.')
    .required("Şifre gereklidir")
  });

  return (
    <div className="body">
      <div className="left-login">
        <img src={Img} alt="chart" className="chart" />
      </div>

      <div className="right-login">
        <div className="card-login">
          <h1>REGISTER</h1>
          <Formik
            initialValues={{
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                password: "",
            }}
            onSubmit={(values, actions) => {
              actions.resetForm();
              actions.setSubmitting(false);
              createUser({...values,password2:values.password},navigate);
            }}
            validationSchema={validationsRegister}
          >
            {({ values, handleChange, errors, touched, handleBlur }) => (
              <Form className="login-form">
                <div className="form-group">
                  <label form="username">Username</label>

                  <Field
                    name="username"
                    type="text"
                    className="form-field"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    component="span"
                    name="username"
                    className="form-error"
                  />
                </div>
                <div className="form-group">
                  <label form="username">First Name</label>

                  <Field
                    name="first_name"
                    type="text"
                    className="form-field"
                    placeholder="First Name"
                  />
                  <ErrorMessage
                    component="span"
                    name="first_name"
                    className="form-error"
                  />
                </div>
                <div className="form-group">
                  <label form="last_name">Last Name</label>

                  <Field
                    name="last_name"
                    type="text"
                    className="form-field"
                    placeholder="Last Name"
                  />
                  <ErrorMessage
                    component="span"
                    name="last_name"
                    className="form-error"
                  />
                </div>
                <div className="form-group">
                  <label form="email">Email</label>

                  <Field
                    name="email"
                    type="email"
                    className="form-field"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    component="span"
                    name="email"
                    className="form-error"
                  />
                </div>

                {/*Outro campo*/}

                <div className="form-group">
                  <label form="email">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-field"
                    placeholder="Password"
                  />

                  <ErrorMessage
                    component="span"
                    name="password"
                    className="form-error"
                  />
                </div>
             <button className="button" type="submit">
                  Register
                </button>
              </Form>
            )}
          </Formik>
          <div className="user-link-cad" onClick={()=>navigate("/")}>
               Do you have an account?
        </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
