import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Logged in Successfully", "success")
      history.push("/login")

    }
    else{
      props.showAlert("invalid details","danger");

    }
    
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

    return (
      <div>  
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              id="email"
              name="email"
              onChange={onchange}
              aria-describedby="emailHelp"
              placeholder="Enter email"
              autoComplete="on"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              id="password"
              name="password"
              onChange={onchange}
              placeholder="Password"
              autoComplete="on"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  };


export default Login;
