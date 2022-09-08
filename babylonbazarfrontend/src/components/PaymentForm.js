import React, {useState} from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {useAtom} from "jotai";
import {REFRESH} from "../STORE";




const PaymentForm = () => {
    const elements = useElements();
    const stripe = useStripe();
    const [sum, setSum] = useState();
    let [refresh, setRefresh] = useAtom(REFRESH)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const {clientSecret} = await fetch(`https://localhost:7136/Payments/CreatePaymentIntent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'usd',
                amount: sum
            }),
        }).then(response => response.json())
        const {paymentIntent} = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            }
        )
        // const {paymentIntent} = await stripe.(
        //     clientSecret, {
        //         payment_method: {
        //             card: elements.getElement(CardElement),
        //         }
        //     }
        // )
        if (paymentIntent !== undefined) {
            await fetch(`https://localhost:7136/User/AddBalance/${sum/100}`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            })
                .then(() => setRefresh(!refresh))
        }
    }
    return (
        <div>
            <form id="payment-form" onSubmit={handleSubmit}>
                <label>Amount</label>
                <br/>
                <input className={"InputField"} type={"number"} defaultValue={"Amount"} onChange={(e) => setSum(e.target.value * 100)}/>
                <br/>
                <br/>
                <label>Credit card info</label>
                <CardElement className={"PaymentForm InputField"} id="card-element" />
                <button  className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"submit"}>Pay</button>
            </form>
        </div>
    );
};

export default PaymentForm;