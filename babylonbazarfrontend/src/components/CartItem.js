import React, {useState} from 'react';
import ProductCard from "./ProductCard";
import StarRatings from "react-star-ratings";
import CategoriesButton from "./CategoriesButton";
import {useEffect} from "react";

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
    })}

    const removeFromCart = async (productId) => {await fetch(`https://localhost:7136/order/removefromcart/${productId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
        credentials: "include"
    })}

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
        <div onClick={() => props.selectProduct(props.product.product.id)}>
            <img className="cardImage" src={"https://localhost:7136/Images/Products/" + picture}></img>
            <div className="test">
                <span className="ProductCardText">{props.product.product.name}</span>
            </div>
            <br/>
            <span className="ProductCardText">Price: {props.product.product.price}$</span>
        </div>
        {/*<br/>*/}
        <div className="AddAndSubtractQuantity">
            <CategoriesButton buttonStyle="AddButton" buttonTextStyle="AddButtonText" link={removeFromCart} categoryId={props.product.cart.id} text="-" />
            <span className={"Quantity"}>Quantity: {props.product.cart.quantity}</span>
            <CategoriesButton buttonStyle="AddButton" buttonTextStyle="AddButtonText" link={addToCart} categoryId={props.product.product.id} text="+" />
        </div>
    </div>






    );
}

export default CartItem;