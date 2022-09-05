import React from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'




const PaymentForm = () => {
    const elements = useElements();
    const stripe = useStripe();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        console.log(elements)
        console.log(stripe)
        const {clientSecret} = await fetch(`https://localhost:7136/Payments/CreatePaymentIntent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodType: 'card',
                currency: 'eur',
            }),
        }).then(response => response.json())

        const {paymentIntent} = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            }
        )
        console.log(paymentIntent.id)
        console.log(paymentIntent.status)
    }
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" />
            <button  className={"CategoriesHeaderButton CategoriesHeaderButtonText"} type={"submit"}>Pay</button>
        </form>
    );
};

export default PaymentForm;