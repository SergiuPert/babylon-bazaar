import React from 'react';
import {useEffect, useState} from "react";
import Images from "./Images";
import Reviews from "./Reviews";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import StarRatings from "react-star-ratings";

function ProductDetails(props) {
    let emptyColor = '#b6b4b4'
    let ratedColor = '#e3a303'

    let [product, setProduct] = useState(null)
    useEffect(() => {
        fetch(`https://localhost:7136/Product/ProductDetails/${props.productId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setProduct(response) })
    }, [props.productId])


    if (product === null) {
        return <div>Loading</div> //loading icon
    }
    return (
        <div className="ProductDetails">
            <div className="Flex">
                <div>
                <Carousel showArrows={true} width="30vw" swipeable={true} dynamicHeight={true}>
                    <div>
                        <img src={require("../images/pc1.jpg")} />
                    </div>
                    <div>
                        <img src={require("../images/pc2.png")} />
                    </div>
                    <div>
                        <img src={require("../images/potatoes.jpg")} />
                    </div>
                </Carousel>
                </div>
                <div className="ProductMainDetails">
                    <h1>{product.product.name}</h1>
                    <h1>Supplier: {product.supplier}</h1>
                    <StarRatings rating={product.rating} starDimension="1vw" starSpacing="0.01vw"  starRatedColor={ratedColor} starEmptyColor={emptyColor} />
                    <h1>Product price: {product.product.price}</h1>
                    <h1>Product description:</h1>
                    <h2>{product.product.description}</h2>
                </div>
            </div>
            <Reviews reviews={product.reviews} />
        </div>
    );
}

export default ProductDetails;