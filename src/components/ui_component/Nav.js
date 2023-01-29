import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("users");
  let rolecheck = JSON.parse(auth);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("users");
    localStorage.removeItem("token");
    localStorage.removeItem("Image");
    navigate("/signup");
  };
  return (
    <div className="navbar header" id="header">
      <img
        className="nav-img"
        alt="logo"
        src="https://cdn.logo.com/hotlink-ok/logo-social.png"
      />
      
      {auth ? (
        <div className="navbar">
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add products</Link>
            </li>
            {rolecheck.role === "ADMIN" ? (
              <li>
                <Link to="/users">Users</Link>
              </li>
            ) : (
              <></>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logout} to="/login">
                Logout,{" "}
                {JSON.parse(auth).name.charAt(0).toUpperCase() +
                  JSON.parse(auth).name.slice(1)}
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="navbar nav-right">
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>{" "}
            <li>
              <Link to="/login">Login</Link>
            </li>{" "}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
