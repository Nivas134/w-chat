import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../api/testApi";
import { logout } from "../redux/reducers/userReducer";

function UsersList() {
  const loggedInUser = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  const logoutUser = useCallback(async () => {
    await dispatch(logout());
    window.location = "/login";
  }, []);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(token, loggedInUser.email)
      .then((res) => {
        // console.log("AllUsers", res);
        if (res.code) {
          logoutUser();
        }
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Error while getting users", err);
      });
  }, [token, loggedInUser, logoutUser]);

  return (
    <div>
      <h3>
        LoggedIn User - {loggedInUser ? loggedInUser.name : "No User"} -{" "}
        {isLoggedIn.toString()}
      </h3>
      <div className="list-group">
        {users?.map((user) => {
          return (
            <button
              type="button"
              className="list-group-item list-group-item-action"
              key={user._id}
            >
              {user.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default UsersList;
