import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../api/testApi";
import { login } from "../redux/reducers/userReducer";

function CreateUser() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState({
    name: "",
    email: "",
    password: "",
    submiterr: "",
  });

  const blurHandlechange = (e) => {
    // console.log("BLURR", e.target.value.length);

    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

    if (e.target.name === "name" && e.target.value.length < 3) {
      setErr({ ...err, name: "name should be minimum of 3 characters" });
    } else if (e.target.name === "name" && e.target.value.length > 3) {
      setErr({ ...err, name: "" });
    }
    if (
      e.target.name === "email" &&
      !regex.test(e.target.value.toLowerCase())
    ) {
      // console.log(
      //   "Email",
      //   e.target.name === "email" && regex.test(e.target.value.toLowerCase())
      // );

      setErr({ ...err, email: "Email should be valid" });
    } else if (
      e.target.name === "email" &&
      regex.test(e.target.value.toLowerCase())
    ) {
      setErr({ ...err, email: "" });
    }
    if (e.target.name === "password" && e.target.value.length < 5) {
      setErr({
        ...err,
        password: "password should be minimum of 5 characters",
      });
    } else if (e.target.name === "password" && e.target.value.length > 5) {
      setErr({ ...err, password: "" });
    }
    console.log(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      err.email === "" &&
      err.name === "" &&
      err.password === "" &&
      user.name !== "" &&
      user.email !== "" &&
      user.password !== ""
    ) {
      let newUser = await createUser(user);

      if (newUser.status === 200) {
        alert("New user created");
        console.log("New user created", newUser);
        if (newUser.data) {
          dispatch(
            login({
              user: newUser.data.user,
              token: newUser.data.token,
            })
          );
        }
        setUser({
          name: "",
          email: "",
          password: "",
        });
        window.location = "/chatbox";
      } else {
        alert("email id may have already taken");
      }
      // console.log("Error occured while created the user");
    } else {
      setErr({
        ...err,
        submiterr: "Please fill all the required fields",
      });
    }
  };

  return (
    <div>
      <h3>Create Account</h3>
      <br />
      <br />
      <form>
        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input
            minLength={3}
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter Name"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
              setErr({
                ...err,
                submiterr: "",
              });
            }}
            onBlur={(e) => {
              blurHandlechange(e);
            }}
          />
          <p className="validationErr">{err.name}</p>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address*</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value.toLowerCase() });
              setErr({
                ...err,
                submiterr: "",
              });
            }}
            onBlur={(e) => {
              blurHandlechange(e);
            }}
          />
          <p className="validationErr">{err.email}</p>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password*</label>
          <input
            required
            minLength={5}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
              setErr({
                ...err,
                submiterr: "",
              });
            }}
            onBlur={(e) => {
              blurHandlechange(e);
            }}
          />
          <p className="validationErr">{err.password}</p>
        </div>
        <p className="validationErr">{err.submiterr}</p>
        <br />
        <p>
          Already have an account?{" "}
          <span>
            <a href="/login">Login here</a>
          </span>
        </p>
        <br />
        <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
