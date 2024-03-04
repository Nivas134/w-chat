import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/reducers/userReducer";
import "../styles/Navbar.css";

function Navbar() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const loggedInUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const logoutUser = async () => {
    await dispatch(logout());
    window.location = "/login";
  };
  return (
    <>
      <div className="navbar">
        <nav>
          <ul className="nav-elem">
            {isLoggedIn && (
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink to="/create">Create</NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <NavLink onClick={() => logoutUser()}>Logout</NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div>
          {isLoggedIn && (
            <p>
              Loggedin user: <span>{loggedInUser?.name}</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
