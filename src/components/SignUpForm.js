import { useState } from "react";
import { Input, Button } from "reactstrap"
import SignupImage from "./SignupImage.png"



function SignUpForm({ props }) {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")


  // function checkEmpty(valueArray){
  //   console.log(valueArray)

  // }

  async function handleSubmit() {
    if (!username || !email || !password || !password2) {
      alert("please fill all the fields")
    }


    if (password != password2) {
      alert("password didn't match")
    }
    var signUpPayload = {
      username: username,
      email: email,
      password: password,
      password_2: password2
    }

    var response = await fetch('http://127.0.0.1:8000/profiles/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpPayload)
    })
    
    if(response.status === 500){
      alert("server error")
    }
    if(response.status === 200 || response.status === 201){
      var data = await response.json()
      console.log("success", data)
      localStorage.setItem("token", data.token )
      localStorage.setItem("username", data.username )

    }
    else{
      var data = await response.json()
      alert(data)
    }
  }

  return (
    // {/* <div className="container"> */}
    <div className="row">
      <div className="col-md-6" >
        <div className="container" style={{margin:"auto"}}>
        <h3 style={{textAlign: "center"}}>Sign Up</h3>
        <div className="mb-3">
          <label>username</label>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button onClick={handleSubmit} className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/signin">sign in?</a>
        </p>

        </div>
     
      </div>

      <div className="col-md-6" style={{ height: "80", width: "80" }} >
        <img src={SignupImage}></img>
      </div>
    </div>

  );
};


export default SignUpForm