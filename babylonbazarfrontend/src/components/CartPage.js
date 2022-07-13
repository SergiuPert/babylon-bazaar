import React from 'react';
import NavBar from "./NavBar";
import Footer from "./Footer";
import Cart from "./Cart";
import { useEffect, useState } from 'react'

function CartPage(props) {
    let [userId, setUserId] = useState(1)
    return (
        <div>
            <NavBar />
            <Cart />
            <Footer />
        </div>
    );
}

export default CartPage;