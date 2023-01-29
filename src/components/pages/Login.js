import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  });


  

  const LoginHandle = async () => {

    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth){
      localStorage.setItem("users", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
    } else {
      alert("No user found or invalid password");
    }
  };

  return (
    <div className="LoginCon">
      <p>Login</p>
      <div className="inputfields">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email..."
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password..."
        />
        <button onClick={LoginHandle} className="loginbtn">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
