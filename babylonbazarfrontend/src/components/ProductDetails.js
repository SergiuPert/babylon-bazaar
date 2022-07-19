import React from 'react';
import {useEffect, useState} from "react";
import Images from "./Images";
import Reviews from "./Reviews";

function ProductDetails(props) {


    if (props.product === null) {
        return <div>Loading</div> //loading icon
    }
    return (
        <div className="ProductDetails">
            <div className="Flex">
                <Images images={props.product.images} />
                <div>
                    <h1>Product name: {props.product.product.name}</h1>
                    <h1>Product price: {props.product.product.price}</h1>
                    <h1>Product supplier: {props.product.supplier}</h1>

                </div>
            </div>
            <h1>Product description: {props.product.product.description}</h1>
            <h1>Rating: {props.product.rating}</h1>
            <Reviews reviews={props.product.reviews} />
        </div>
    );
}

export default ProductDetails;