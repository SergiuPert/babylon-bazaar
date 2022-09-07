import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { useEffect, useState } from 'react'
import {Navigate} from "react-router-dom";

 const Login = (props) => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [redirect, setRedirect] = useState(false);
	const submit = async (e) => {
		e.preventDefault();
		const response = await fetch('https://localhost:7136/login/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
			credentials: 'include',
			body: JSON.stringify({
				username,
				password
			})
		});
		const content = response.json()
		// props.setUserName(content.name)
		props.setUserId(content.id)
		setRedirect(true)
	};

	if(redirect) {
		return <Navigate to="/"/>
	}

	return (
		<div className="registerForm">
			<h1>Please Log In</h1>
			<form onSubmit={submit}>
				<input className={"InputField"} type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} />
				<br/>
				<input className={"InputField"} type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
				<br/>
				<div className={"CategoriesHeaderButton"}>
					<button className={"CategoriesHeaderButtonText"} type="submit">Login</button>
				</div>
			</form>
		</div>)
	}

export default Login;