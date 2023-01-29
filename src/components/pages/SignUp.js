import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async (req, res) => {
    let myFile = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
    console.log(myFile);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password, myFile }),
      headers: {
        "Content-Type": "application/json",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      },
    });
    result = await result.json();
    if (result.err === 11000) {
      setError(result.message);
    } else {
      localStorage.setItem("users", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    }
  };

  return (
    <div className="RegisterCon">
      <p>Register</p>
      <div className="inputfields">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name..."
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email..."
        />
        {error && email && <span className="invalid-message">{error}</span>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password..."
        />
        <button onClick={collectData} className="registerbtn">
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignUp;
