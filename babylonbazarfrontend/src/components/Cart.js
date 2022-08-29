import React from 'react';
import {useEffect, useState} from "react";
import CartItem from "./CartItem";
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";
import Total from "./Total";

const Cart = (props) => {
    let [user] = useAtom(USER_ATOM)
    let [cart, setCart] = useState(null)
    let [refresh, setRefresh] = useState(true)
    let [cartTotal, setCartTotal] = useState(0)
    useEffect( () => {
        fetch(`https://localhost:7136/Order/Cart/${user? user.id:0}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setCart(response)})
    }, [user, refresh])

    if (cart === null) {
        return <div>Loading...</div>
    }

    const ref = () => {
        setRefresh(!refresh)
    }

    return (
        <>
        <div className="Cart">
            <div className={"CartItems"}>
                {cart.products.map(product =>
                <CartItem product={product} refresh={ref} />
                )}
            </div>
            <Total cart={cart} />
        </div>

        </>
        );
}

export default Cart;