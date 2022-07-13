import React from 'react';
import ProductCard from "./ProductCard";

const CartItem = (props) => {
    return (
        <div className="ProductCard">
            <h1>Name: {props.product.product.name}</h1>
            <div className="Flex">
                <h1>Price: {props.product.product.price}$</h1>
                <h1>Quantity: {props.product.cart.quantity}</h1>
            </div>
            <h1>Total price: {props.product.cart.quantity * props.product.product.price}$</h1>
        </div>
    );
}

export default CartItem;