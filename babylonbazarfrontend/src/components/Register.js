import React from 'react';
import {useState} from "react";
import {Navigate} from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault()
        let res = await fetch('https://localhost:7136/login/register', {
		    method: 'POST',
		    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
    setRedirect(true)
    };

    if(redirect) {
        return <Navigate to="/login" />;
    }


    return (
        <div className="registerForm">
            <form onSubmit={submit}>
                <h1>Register</h1>
                <input placeholder="Username" onChange={e => setName(e.target.value)} required />
                <br/>
                <input type="email" placeholder="Email address" onChange={e => setEmail(e.target.value)} required />
                <br/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;