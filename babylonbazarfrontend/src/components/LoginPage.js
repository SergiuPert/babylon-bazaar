import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";
import Login from "./Login";
import { useEffect, useState } from 'react'
import useToken from './useToken.js';

const LoginPage = (props) => {
    const { token, setToken } = useToken();

    return (
        <>
            <Login setToken={setToken} />
        </>
    );
}

export default LoginPage;