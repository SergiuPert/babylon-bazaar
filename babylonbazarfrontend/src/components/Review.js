import React, {useEffect, useState} from 'react';
import StarRatings from "react-star-ratings";
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";

const Review = (props) => {
    let emptyColor = '#b6b4b4'
    let ratedColor = '#e3a303'
    let [userName, setUserName] = useState("")
    let [user] = useAtom(USER_ATOM)

    useEffect(() => {
        fetch(`https://localhost:7136/user/getusernamebyid/${props.review.userId}`,
            { method: "GET", })
            .then(response => response.json())
            .then((response) => { setUserName(response) })////////to work ss
    }, [])

    const deleteReview = () => {
         fetch(`https://localhost:7136/product/RemoveProductReview/${props.review.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' }})
            .then(() => props.setRefresh(!props.refresh))
    }


    return (
        <div className={"ReviewBox"}>

            <div className={"ReviewHeading"}>
                <h3>{userName} </h3>
                <div className={"ReviewStars"}>
                    <StarRatings rating={props.review.rating} starDimension="1vw" starSpacing="0.01vw"  starRatedColor={ratedColor} starEmptyColor={emptyColor} />
                </div>
            </div>
            <div className={"ReviewHeading"}>
                <p className={"ReviewComment"}>{props.review.comment}</p>

                {user.id === props.review.userId &&
                    <div className={"ReviewStars"}>
                        <button className={"CategoriesHeaderButton CategoriesHeaderButtonText TableButton"} type={"button"} onClick={deleteReview}>Delete</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Review;