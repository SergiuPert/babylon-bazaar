import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { useEffect, useState } from 'react'

async function loginUser(credentials) {
//	return fetch('https://localhost:7136/login/login', {
//		method: 'POST',
//		headers: { 'Content-Type': 'application/json' },
//		body: JSON.stringify(credentials)
	//	}).then(data => data.json())
	var query=credentials.username+"^"+credentials.password
	return fetch(`https://localhost:7136/login/login/${query}`, {
		method: 'GET',
	}).then(data => data.json())
}
export default function Login({ setToken }) {
	const [username, setUserName] = useState();
	const [password, setPassword] = useState();
	const handleSubmit = async e => {
		e.preventDefault();
		const token = await loginUser({ username, password });
		console.log(token);
		if (token!="-1") setToken(token);
	}
	return (
		<div className="login-wrapper">
			<h1>Please Log In</h1>
			<form onSubmit={handleSubmit}>
				<label>Username
					<input type="text" onChange={e => setUserName(e.target.value)} />
				</label><label>Password
					<input type="password" onChange={e => setPassword(e.target.value)} />
				</label><div><button type="submit">Submit
				</button></div></form>
		</div>)
}
Login.propTypes = { setToken: PropTypes.func.isRequired }