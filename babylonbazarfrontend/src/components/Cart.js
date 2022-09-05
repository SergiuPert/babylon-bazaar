import React from 'react';
import {useEffect, useState} from "react";
import CartItem from "./CartItem";
import {useAtom} from "jotai";
import {REFRESH, USER_ATOM} from "../STORE";
import Total from "./Total";
import {NotificationContainer, NotificationManager} from "react-notifications";
import CategoriesButton from "./CategoriesButton";
import Info from "./Info";

const Cart = (props) => {
    let [user] = useAtom(USER_ATOM)
    let [updateBalance, setUpdateBalance] = useAtom(REFRESH)
    let [cart, setCart] = useState(null)
    let [refresh, setRefresh] = useState(true)
    let [cartTotal, setCartTotal] = useState(0)
    let [locations, setLocations] = useState()
    let [location, setLocation] = useState()
    let [submitted, setSubmitted] = useState(false)
    useEffect( () => {
        fetch(`https://localhost:7136/Order/Cart/${user? user.id : 0}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setCart(response)})
    }, [user, refresh])


    useEffect(() => {
        fetch(`https://localhost:7136/User/GetUserLocations/${user? user.id : 0}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setLocations(response) })
    }, [user])

    const order = (e) => {
        e.preventDefault()
        fetch(`https://localhost:7136/Order/Checkout/${location}`, { method: "GET", credentials: "include" })
            .then(() => {setSubmitted(true); setUpdateBalance(!updateBalance)})
    }


    if (cart === null || user === null || locations === null) {
        return <div>Loading...</div>
    }

    const ref = () => {
        setRefresh(!refresh)
    }

    const createNotification = (type, updateCart, id) => {
        return () => {
            updateCart(id)
            switch (type) {
                case 'add':
                    NotificationManager.success('Product Added', 'Success', 2000);
                    break;
                case 'remove':
                    NotificationManager.success('Product Removed', 'Success', 2000);
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };
    if (!submitted && cart != null && user != null && locations != null) {
        return (
        <>
        <div className="Cart">
            <div className={"CartItems"}>
                {cart.products.map(product =>
                <CartItem createNotification={createNotification} product={product} refresh={ref} />
                )}
            </div>
            <Total setCartTotal={setCartTotal} cart={cart} />
            {user.balance >= cartTotal && cartTotal !== 0 &&
                <div>
                    <Info class={"Info"} text={"Select Location: "} />
                    <br/>
                    <form onSubmit={order} >
                        <select className={"InputField"} onChange={(e) => setLocation(e.target.value)} required={true}>
                            <option></option>
                            {locations.map(location =>
                                <option className={"blackText"} value={location.id}>{location.name}</option>
                            )}
                        </select>
                        <br/>
                        <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"submit"}>Order</button>
                    </form>
                </div>
            }
            {user.balance < cartTotal &&
                <div>
                    <Info class={"Info"} text={"Insufficient funds"} />
                    <CategoriesButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" categoryId={""} link={""} text={"Add Funds"} />

                </div>
            }
            <NotificationContainer/>
        </div>
        </>
    )} else {
        return (
            <div className={"Cart"}>
                <div>
                    <h1 className={"ThankYouMessage"}>Thank you!</h1>
                    <h2 className={"ThankYouMessage2"}>Your order is under way.</h2>
                </div>
            </div>
        )
    }
}

export default Cart;