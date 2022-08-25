import React from 'react';
import {useEffect, useState} from "react";
import CartItem from "./CartItem";
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";

const Cart = (props) => {
    let [user] = useAtom(USER_ATOM)
    let [cart, setCart] = useState(null)
    useEffect(() => {
        fetch(`https://localhost:7136/Order/Cart/${user? user.id:0}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setCart(response) })
    }, [user])
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