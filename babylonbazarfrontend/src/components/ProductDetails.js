import React from 'react';
import {useEffect, useState} from "react";
import Images from "./Images";
import Reviews from "./Reviews";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import StarRatings from "react-star-ratings";
import CategoriesButton from "./CategoriesButton";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";

function ProductDetails(props) {
    let emptyColor = '#b6b4b4'
    let ratedColor = '#e3a303'
    let [user] = useAtom(USER_ATOM)
    let [product, setProduct] = useState(null)
    let [refresh, setRefresh] = useState(true)
    useEffect(() => {
        fetch(`https://localhost:7136/Product/ProductDetails/${props.productId}`, { method: "GET", })
            .then(response => response.json())
            .then((response) => { setProduct(response) })
    }, [props.productId, refresh])

    const addToCart = async () => {await fetch(`https://localhost:7136/order/addtocart/${props.productId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
        credentials: "include"
    })}

    const createNotification = (type) => {
        return () => {
            switch (type) {
                case 'add':
                    addToCart()
                    NotificationManager.success('Product Added', 'Success', 2000);
                    break;
                case 'remove':
                    NotificationManager.success('Product Removed', 'Success', 2000);
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Please Login to add items to cart', 'Error', 5000);
                    break;
            }
        };
    };








    if (product === null) {
        return <div>Loading</div> //loading icon
    }
    let productImagesCount = product.images.length
    return (
        <div className="ProductDetails">
            <div className="Flex">
                {product.images.length !== 0 &&
                    <div>
                        <Carousel showArrows={true} width="30vw" swipeable={true} dynamicHeight={true}>
                            {product.images.map(image =>
                                <div>
                                    <img src={"https://localhost:7136/Images/Products/" + image.name}/>
                                </div>
                            )
                            }


                        </Carousel>
                    </div>
                }
                {productImagesCount === 0 &&
                    <div>
                        <img style={{width: "30vw"}} src={require("../images/default-image.jpg")}/>
                    </div>
                }
                <div className="ProductMainDetails">
                    <h1>{product.product.name}</h1>
                    <h1>Supplier: {product.supplier}</h1>
                    <StarRatings rating={product.rating} starDimension="1vw" starSpacing="0.01vw"  starRatedColor={ratedColor} starEmptyColor={emptyColor} />
                    <h1>Product price: {product.product.price}</h1>
                    <h1>Product description:</h1>
                    <h2>{product.product.description}</h2>
                    {/*<CategoriesButton buttonStyle="CategoriesHeaderButton" buttonTextStyle="CategoriesHeaderButtonText" link={addToCart} categoryId={props.productId} text="Add" />*/}
                    {user != null &&
                        <div className={"CategoriesHeaderButton"} onClick={createNotification("add")}>
                            <button className={"CategoriesHeaderButtonText"} >Add</button>
                        </div>
                    }
                    {user == null &&
                        <div className={"CategoriesHeaderButton"} onClick={createNotification("error")}>
                            <button className={"CategoriesHeaderButtonText"} >Add</button>
                        </div>
                    }
                </div>
            </div>
            <Reviews refresh={refresh} setRefresh={setRefresh} productId={product.product.id} reviews={product.reviews} />
            <NotificationContainer/>
        </div>
    );
}

export default ProductDetails;