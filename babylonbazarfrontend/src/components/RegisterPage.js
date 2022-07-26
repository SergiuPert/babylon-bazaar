import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";
import Register from "./Register";
import { useEffect, useState } from 'react'

const RegisterPage = (props) => {
    let [userId, setUserId] = useState(2) //consider saving the cart in the front end

    return (
        <>
            <NavBar />
            <Register />
            <Footer />
        </>
    );
}

export default RegisterPage;