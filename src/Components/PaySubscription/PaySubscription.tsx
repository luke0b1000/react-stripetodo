import React from 'react';
import { stripePublishableKey } from '../../myConfig';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import Header from '../Header';

const stripePromise = loadStripe(stripePublishableKey);

function PaySubscription({ customerId }: { customerId: string }) {
    return (
        <>
            <Header />
            <main className="main">
                <div className="pay-subscription">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm customerId={customerId} />
                    </Elements>
                </div>
            </main>
            <footer>
                <p>&copy; CompanyX</p>
            </footer>
        </>
    );
}

export default PaySubscription;
