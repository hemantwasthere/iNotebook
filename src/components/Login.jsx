import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useNavigate();

    const host = "http://localhost:5000";
    const handleSubmit = async (e) => {
        e.preventDefault();
        // API Call
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            history("/");
            props.showAlert("Successfully Logged In", "success")
        }else{
            props.showAlert("Invalid Details", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name='email' id="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name='password' id="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login