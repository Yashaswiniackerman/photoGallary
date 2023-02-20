import { useState } from "react";
import SignInImage from "./SIgnInImage.png"
import {useNavigate} from "react-router-dom"



function SignInForm({ props }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    async function handleSubmit() {
        var signInPayload = {
            username: username,

            password: password,
        }
        var response = await fetch('http://127.0.0.1:8000/profiles/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signInPayload)
        })

        if (response.status === 500) {
            alert("server error")
        }
        if (response.status === 200 || response.status === 201) {
            var data = await response.json()
            console.log("success", data)
            localStorage.setItem("token", data.token )
            localStorage.setItem("username", data.username )
            navigate("/community")

            // setdata(data)
        }
        else {
            var data = await response.json()
            alert(JSON.stringify(data))
        }

    }

    return (
        <div className="row">
            <div className="col-md-6" >
                <div className="container" style={{ margin: "auto" }}>
                    <h3 style={{ textAlign: "center" }}>Sign In</h3>
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
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button onClick={handleSubmit} className="btn btn-primary">
                            Sign In
                        </button>
                    </div>
                    

                </div>

            </div>
            <div className="col-md-6" style={{ height: "80", width: "80" }} >
                        <img src={SignInImage}></img>
            </div>

        </div>
    );



};

export default SignInForm







