import React from 'react';
import {useEffect, useState} from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
    let [userId, setUserId] = useState(2)
    let [cart, setCart] = useState(null)
    useEffect(() => {
        fetch(`https://localhost:7136/Order/Cart/${userId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setCart(response) })
    }, [props.userId])
    if (cart === null) {
        return <div>Loading...</div>
    }
    return (
        <div className="Cart">
            {cart.products.map(product =>
            <CartItem product={product} />
            )}
        </div>
    );
}

export default Cart;