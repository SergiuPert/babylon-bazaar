import { useState } from 'react';
export default function useToken() {
	const getToken = () => {
		const tokenString = sessionStorage.getItem('userId');
		const userToken = JSON.parse(tokenString);
		return userToken?.token
	};
	const saveToken = (userToken) => {
		sessionStorage.setItem('userId', JSON.stringify(userToken));
		setToken(userToken.token);
	};
	const [token, setToken] = useState(getToken());
	return { setToken: saveToken, token }
}