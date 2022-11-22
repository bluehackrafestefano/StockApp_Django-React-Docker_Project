import "../styles/login.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
// import Axios from "axios";
import Img from "../assets/result.svg";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const {signIn} = React.useContext(AuthContext)
    const navigate = useNavigate()

  const validationsLogin = yup.object().shape({
    email: yup.string().email("Email invalid").required("Email is required"),
    password: yup
      .string()
      .min(8, "Must be minimum 8 characters")
      .required("Password is required"),
  });

  return (
    <div className="main">
      <h1 style={{textAlign:'center',color:"white",display:"block"}}>Stock App</h1>
     <div className="body">
     <div className="left-login">
        <img src={Img} alt="chart" className="chart" />
      </div>

      <div className="right-login">
        <div className="card-login">
          <h1>LOGIN</h1>
          <Formik
            initialValues={{email: "", password: "" }}
            onSubmit={(values, actions) => {
              actions.resetForm();
              actions.setSubmitting(false);
              signIn(values,navigate);
            }}
            validationSchema={validationsLogin}
          >
            {({ values, handleChange, errors, touched, handleBlur }) => (
              <Form className="login-form">
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
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <div className="user-link-cad" onClick={()=>navigate("/register")}>
               Do you have not account?
        </div>
        </div>
      </div>
     </div>
    </div>
  );
}

export default Login;
