import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    loginStatus: false,
  });

  useEffect(() => {
    // if (localStorage.getItem("accessToken"))
    axios
      .get("http://localhost:3001/auth/validate", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, loginStatus: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            loginStatus: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      loginStatus: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.loginStatus ? (
                <>
                  <Link to="/login"> Login </Link>
                  <Link to="/signUp"> Sign-Up </Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home Page </Link>
                  <Link to="/createpost"> Create A Post </Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username}</h1>
              {authState.username && (
                <button onClick={logout}> Loogout </button>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
