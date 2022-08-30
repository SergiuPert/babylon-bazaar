import Info from './Info.js'
import CategoriesButton from "./CategoriesButton";
// import Stars from "./Stars";
import StarRatings from "react-star-ratings";
import {NotificationContainer, NotificationManager} from "react-notifications";
import React from "react";
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";

const ProductCard = (props) => {
    const images = ["pc1.jpg", "pc2.png", "vase1.jpg", "vase2.jpg", "potatoes.jpg", "tomatoes.jpg", "wheel.jpg"]
    let emptyColor = '#b6b4b4'
    let ratedColor = '#e3a303'
    let [user] = useAtom(USER_ATOM)

    const addToCart = async (productId) => {await fetch(`https://localhost:7136/order/addtocart/${productId}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000'},
        credentials: "include"
    })}

    const createNotification = (type) => {
        return () => {
            switch (type) {
                case 'add':
                    addToCart(props.productModel.product.id)
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



    return (
        <div className="ProductCard">
            <div onClick={() => props.selectProduct(props.productModel.product.id)}>
                {props.productModel.image.name !== "default" &&
                    <img className="cardImage" src={"https://localhost:7136/Images/Products/" + props.productModel.image.name}></img>
                }
                {props.productModel.image.name === "default" &&
                    <img className="cardImage" src={require("../images/default-image.jpg")}></img>
                }
            <div className="test">
                <span className="ProductCardText">{props.productModel.product.name}</span>
            </div>
            <div>
                <span className="ProductCardText" style={{paddingRight: "3vw"}}>{props.productModel.supplier}</span>
                {/*<Stars rating={props.productModel.rating} />*/}
                <StarRatings rating={props.productModel.rating} starDimension="1vw" starSpacing="0.01vw"  starRatedColor={ratedColor} starEmptyColor={emptyColor} />
                <span className="ProductCardText">({props.productModel.rating})</span>
            </div>
                <span className="ProductCardText">Price: {props.productModel.product.price}$</span>
            </div>
            {/*<CategoriesButton buttonStyle="AddButton" buttonTextStyle="AddButtonText" link={createNotification} categoryId={"success"} text="Add" />*/}
            {user != null &&
                <div className={"AddButton"} onClick={createNotification("add")}>
                    <button className={"AddButtonText"} >Add</button>
                </div>
            }
            {user == null &&
                <div className={"AddButton"} onClick={createNotification("error")}>
                    <button className={"AddButtonText"} >Add</button>
                </div>
            }

            <NotificationContainer/>
        </div>
    );
}

export default ProductCard;