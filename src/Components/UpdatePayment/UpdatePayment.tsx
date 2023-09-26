import React from 'react';
import { useHistory } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useMutation, useQueryClient } from 'react-query';
import fetchUpdatePayment from './fetchUpdatePayment';
import Header from '../Header';

const stripePromise = loadStripe('pk_test_thgGtacxYYyFtb6rQDHYKMqT00jLItVqT2');

function useMutationUpdatePayment() {
    const queryClient = useQueryClient();
    return useMutation('updatePayment', fetchUpdatePayment, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        },
    });
}

function UpdateForm() {
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [handleSubmitLoading, setHandleSubmitLoading] = React.useState(false);
    const {
        mutateAsync: handleUpdatePayment,
        isLoading: isLoadingHandleUpdatePayment,
        isSuccess: isSuccessHandleUpdatePayment,
    } = useMutationUpdatePayment();

    const handleSubmit = async (event: any) => {
        // Block native form submission.
        event.preventDefault();
        setHandleSubmitLoading(true);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement)!;

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            throw new Error('payment Error');
        } else {
            const paymentMethodId = paymentMethod!.id;
            handleUpdatePayment({
                paymentMethodId,
            }).then(response => {
                history.push('/settings');
            });
        }
        setHandleSubmitLoading(false);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <div className="updatePayment-button-submit-div">
                    <button
                        className="updatePayment-button-submit"
                        type="submit"
                        disabled={
                            !stripe ||
                            isSuccessHandleUpdatePayment ||
                            isLoadingHandleUpdatePayment ||
                            handleSubmitLoading
                        }
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}

function UpdatePayment() {
    return (
        <>
            <Header />
            <main className="main">
                <div className="updatePayment-column">
                    <Elements stripe={stripePromise}>
                        <UpdateForm />
                    </Elements>
                </div>
            </main>
            <footer>
                <p>&copy; CompanyX</p>
            </footer>
        </>
    );
}

export default UpdatePayment;
