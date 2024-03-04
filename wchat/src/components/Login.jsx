import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../api/testApi";
import { login } from "../redux/reducers/userReducer";

function Login() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const reduxState = useSelector((state) => state);

  // console.log("REDUX STATE", reduxState);

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState({
    email: "",
    password: "",
    submiterr: "",
  });

  const blurHandlechange = (e) => {
    // console.log("BLURR", e.target.value.length);

    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

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
      err.password === "" &&
      user.email !== "" &&
      user.password !== ""
    ) {
      const getLoginUser = await loginUser(user);
      if (getLoginUser.data) {
        // console.log("TOKEN---", getLoginUser.data);
        if (getLoginUser.data?.user?.password === user.password) {
          console.log("Login successfull", getLoginUser);
          dispatch(
            login({
              user: getLoginUser.data.user,
              token: getLoginUser.data.token,
            })
          );
          setUser({
            email: "",
            password: "",
          });
          alert("Login successful", isLoggedIn);
          window.location = "/chatbox";
        } else {
          alert("Invalid Email ID or password");
        }
      } else {
        console.log("User Not Found", getLoginUser);
        alert("Invalid Email ID or password");
      }
    } else {
      setErr({
        ...err,
        submiterr: "Please fill all the required fields",
      });
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <br />
      <br />
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
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
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="Password"
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
          Don't have an account?{" "}
          <span>
            <a href="/create">Create account here</a>
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

export default Login;
