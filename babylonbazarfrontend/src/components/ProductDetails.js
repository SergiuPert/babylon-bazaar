import React from 'react';
import {useEffect, useState} from "react";
import Images from "./Images";
import Reviews from "./Reviews";

function ProductDetails(props) {


    console.log(props.product)
    if (props.product === null) {
        return <div>Loading</div>
    }
    return (
        <div style={{backgroundColor: "white"}}>
            <Images images={props.product.images} />
            <h1>Product ID: {props.productId}</h1>
            <h1>Product name: {props.product.product.name}</h1>
            <h1>Product price: {props.product.product.price}</h1>
            <h1>Product description: {props.product.product.description}</h1>
            <h1>Product supplier: {props.product.supplier}</h1>
            <h1>Rating: {props.product.rating}</h1>
            <Reviews reviews={props.product.reviews} />
        </div>
    );
}

export default ProductDetails;