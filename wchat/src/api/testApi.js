import axios from "axios";
const server_URL = "http://localhost:3008";

const getSampleData = async () => {
  let response = await axios
    .get(`${server_URL}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

const createUser = async (user) => {
  let newUser = await axios
    .post(`${server_URL}/users/create`, user)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return newUser;
};

const getUsers = async (token, loggedInUser) => {
  // console.log("GET_USERS_TOKEN", token);
  let allUsers = await axios
    .get(`${server_URL}/users`, {
      headers: {
        Authorization: token,
        user: loggedInUser,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return allUsers;
};

const loginUser = async (user) => {
  let userFound = await axios
    .post(`${server_URL}/users/login`, user)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return userFound;
};

export { createUser, getSampleData, getUsers, loginUser };
