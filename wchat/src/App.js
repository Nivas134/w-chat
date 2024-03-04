import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ChatBox from "./components/ChatBox";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NoPageFound from "./components/NoPageFound";
import { UserValidation } from "./components/UserValidation";
import UsersList from "./components/UsersList";

function App() {
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const token = useSelector((state) => state.user.token);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="App-body">
        <Routes>
          <Route
            exact
            path="/"
            element={
              isLoggedIn ? <UsersList /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate replace to="/" />}
          />
          <Route
            path="/create"
            element={!isLoggedIn ? <CreateUser /> : <Navigate replace to="/" />}
          />
          <Route
            path="/chatbox"
            element={
              isLoggedIn ? <ChatBox /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/validate"
            element={
              isLoggedIn ? <UserValidation /> : <Navigate replace to="/login" />
            }
          />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
