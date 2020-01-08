import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_cMUnWbA3l8wVIlR2mxl6tEQ700LzkxfKm0';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert("Payment Successful");
        }).catch(error => {
            // console.log('Payment error : ',JSON.parse(error));
            alert("There was an issue with your payment. Please be sure you use the provided credit card.");
        }) 
    };

    return (
        <StripeCheckout
            label = 'Pay Now'
            name = 'Myntra Shopping Ltd.'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    );
}

export default StripeCheckoutButton