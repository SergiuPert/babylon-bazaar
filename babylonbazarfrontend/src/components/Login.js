import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { useEffect, useState } from 'react'
import {Navigate} from "react-router-dom";

 const Login = () => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const submit = async (e) => {
		e.preventDefault();
		await fetch('https://localhost:7136/login/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
			credentials: 'include',
			body: JSON.stringify({
				username,
				password
			})
		});
		setRedirect(true)
	};

	if(redirect) {
		return <Navigate to="/"/>
	}

	return (
		<div className="login-wrapper">
			<h1>Please Log In</h1>
			<form onSubmit={submit}>
				<label>Username
					<input type="text" onChange={e => setUserName(e.target.value)} />
				</label><label>Password
					<input type="password" onChange={e => setPassword(e.target.value)} />
				</label><div><button type="submit">Submit
				</button></div></form>
		</div>)
	}

export default Login;