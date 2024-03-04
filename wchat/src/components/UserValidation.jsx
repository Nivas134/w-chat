import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export function UserValidation() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // let newUser = await createUser(user);
    // console.log("New user created", newUser);
    // setUser({
    //   name: "",
    //   email: "",
    //   password: "",
    // });
    // window.location = "/";
    console.log("values", values);
  };

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          name: "",
          password: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched, validateForm }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                minLength={3}
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                name="password"
                minLength={5}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div className="form-check"></div>
            <button
              //   onClick={(e) => handleSubmit(e)}
              onClick={() =>
                validateForm().then((res) => console.log("blah", res))
              }
              className="btn btn-primary"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
