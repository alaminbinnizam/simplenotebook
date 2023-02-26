import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';


function Signup(props) {
  const [credentials, setCredentials] = useState({name:"" ,email: "", password: "" , cpassword: ""});
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email , password} = credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log(json);

    if(json.success){
   
      //Save the auth token and redirect
      localStorage.setItem('token',json.authtoken);
      history.push("/")
      props.showAlert("Account created Successfully", "success")
    }
    else{
      props.showAlert("invalid credentials","danger");

    }
   
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Enter Your Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={ onchange}
            aria-describedby="emailHelp"
            placeholder="Enter Your Name"
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={ onchange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={ onchange}
            minLength={5} required
            placeholder="Password"
            autoComplete="on"
          />
        </div>
         <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={ onchange}
            minLength={5} required
            placeholder="Confirm Password"
            autoComplete="on"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
