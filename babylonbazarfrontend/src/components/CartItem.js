import React, {useState} from 'react';
import {useEffect} from "react";
import 'react-notifications/lib/notifications.css';

const CartItem = (props) => {
    const [picture, setPicture] = useState("")
    useEffect(() => {
        fetch(`https://localhost:7136/Product/GetProductImages/${props.product.product.id}`, {method: "GET"})
            .then(response => response.json())
            .then((response) => { setPicture(response[0]) })
    }, [props.product.product.id])
    const addToCart = async (productId) => {await fetch(`https://localhost:7136/order/addtocart/${productId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
        credentials: "include"
    })
        .then(() => {props.refresh()})


    }

    const removeFromCart = async (productId) => {await fetch(`https://localhost:7136/order/removefromcart/${productId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
        credentials: "include"
    })
        .then(() => props.refresh())
    }

    return (
        // <div className="CartItem">
        //     <h1>Name: {props.product.product.name}</h1>
        //     <div>
        //         <h1>Price: {props.product.product.price}$</h1>
        //         <h1>Quantity: {props.product.cart.quantity}</h1>
        //     </div>
        //     <h1>Total price: {props.product.cart.quantity * props.product.product.price}$</h1>
        // </div>

    <div className="ProductCard">
        {/*<div onClick={() => props.selectProduct(props.product.product.id)}>*/}
        <div onClick={props.createNotification("success")}>
            {picture != null &&
                <img className="cardImage" src={"https://localhost:7136/Images/Products/" + picture.name}></img>
            }
            {picture == null &&
                <img className="cardImage" src={require("../images/default-image.jpg")}></img>
            }
            <div className="test" >
                <span className="ProductCardText">{props.product.product.name}</span>
            </div>
            <br/>
            <span className="ProductCardText">Price: {props.product.product.price}$</span>
        </div>
        {/*<br/>*/}
        <div className="AddAndSubtractQuantity">
            {/*<CategoriesButton buttonStyle="AddButton" buttonTextStyle="AddButtonText" link={removeFromCart} categoryId={props.product.cart.id} text="-" />*/}
            <div className={"AddButton"} onClick={(props.createNotification("remove", removeFromCart, props.product.cart.id))}>
                <button className={"AddButtonText"} >-</button>
            </div>
            <span className={"Quantity"}>Quantity: {props.product.cart.quantity}</span>
            {/*<CategoriesButton buttonStyle="AddButton" buttonTextStyle="AddButtonText" link={addToCart} categoryId={props.product.product.id} text="+"/>*/}
            <div className={"AddButton"} onClick={(props.createNotification("add", addToCart, props.product.product.id))}>
                <button className={"AddButtonText"} >+</button>
            </div>
        </div>

    </div>






    );
}

export default CartItem;