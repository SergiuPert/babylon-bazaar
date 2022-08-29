import React from 'react';
import {useState} from "react";
import {useAtom} from "jotai";
import {USER_ATOM} from "../STORE";
import Review from "./Review";

function Reviews(props) {
    let [form, setForm] = useState("")
    let [rating, setRating] = useState(1)
    let [comment, setComment] = useState("")
    let [user] = useAtom(USER_ATOM)
    const addReview = async (e) => {
        e.preventDefault()
        let res = await fetch('https://localhost:7136/product/AddProductReview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
            credentials: "include",
            body: JSON.stringify({
                productId: props.productId,
                comment: comment,
                rating: rating,
            })
        })
        props.setRefresh(!props.refresh)
        setForm("")
    };



    return (
        <div>
            <h1 className={"ReviewTitleText"}>Reviews</h1>
            {user !== null &&
                <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"button"} onClick={() => setForm("Add")}>Add</button>
            }
            {props.reviews.map((review) =>
                <Review refresh={props.refresh} setRefresh={props.setRefresh} review={review} />
                 //reviews
            )}
            {form === "Add" &&
                <form onSubmit={addReview}>
                    <h1>Rating</h1>
                    <input className={"InputField"} type={"number"} required={true} min={1} max={5} onChange={e => setRating(e.target.value)}/>
                    <h1>Comment</h1>
                    <input className={"InputField"} type={"text"} onChange={e => setComment(e.target.value)}/>
                    <br/>
                    <button className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"submit"}>Submit</button>
                </form>
            }
        </div>
    );
}

export default Reviews;