import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";
import Cart from "./Cart";
import { useEffect, useState } from 'react'

const CartPage = (props) => {
    //let [userId, setUserId] = useState(2) //consider saving the cart in the front end
    let userId = parseInt(sessionStorage.getItem('userId'));
    return (
        <>
            <Cart userId={userId} />
        </>
    );
}

export default CartPage;