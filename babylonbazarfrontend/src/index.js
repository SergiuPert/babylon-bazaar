import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';



(async () => {
    const {publishableKey} = await fetch(`https://localhost:7136/Payments/GetPublicKeys`)
        .then(response => response.json())
    const stripePromise = loadStripe("pk_test_51LeboKCsWiaXBlU7KaYvzA2RTLMIYLhL1JiH7x6PqJPyL9Iwxz0eBfQg6bAzrYVvbkRjCKSgUphCsYkgZEVPXqje0020Wgv3lP")


    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <Elements stripe={stripePromise}>
            <App />
        </Elements>
    );
}) ()


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
