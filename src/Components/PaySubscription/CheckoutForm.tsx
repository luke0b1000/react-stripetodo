import React from 'react';
import { API } from 'aws-amplify';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import fetchCreateSubscription from './createSubscription/fetchCreateSubscription';

import gqlGetUSER from '../../Components/User/gqlGetUSER';
import { TYPE_getUSER } from '../../Components/TodoApp/TYPES_TYPES';

const fetchGetUSER = async () => {
    return (await API.graphql({ query: gqlGetUSER })) as TYPE_getUSER;
};

function useMutatationCreateSubscription() {
    const [startFetching, setFetching] = React.useState(false);
    const queryClient = useQueryClient();

    useQuery('fetchGetUSERCRAZY', fetchGetUSER, {
        onSuccess: data => {
            if (data.data.getUSER.Ssubscription) {
                setFetching(false);
                queryClient.invalidateQueries('user');
            }
        },
        enabled: startFetching,
        refetchInterval: 1000,
        refetchIntervalInBackground: true,
    });

    return useMutation(fetchCreateSubscription, {
        onError: (error, variables, context) => {},
        onSuccess: (response, variables, context) => {
            setFetching(true);
        },
    });
}

type TProps = {
    customerId: string;
};

const CheckoutForm: React.FC<TProps & RouteComponentProps> = ({
    customerId,
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [handleSubmitLoading, setHandleSubmitLoading] = React.useState(false);
    const {
        mutateAsync: handleCreateSubscription,
        isLoading: isLoadingcreateSubscription,
        isSuccess,
    } = useMutatationCreateSubscription();

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
            throw new Error('payment gone wrong');
        } else {
            const paymentMethodId = paymentMethod!.id;
            // const last4 = paymentMethod!.card?.last4;
            handleCreateSubscription({
                paymentMethodId,
            }).then(response => {});
        }
        setHandleSubmitLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <div className="pay-subscription-button-submit-div">
                <button
                    className="pay-subscription-button-submit"
                    type="submit"
                    disabled={
                        !stripe ||
                        isLoadingcreateSubscription ||
                        isSuccess ||
                        handleSubmitLoading
                    }
                >
                    Start Subscription!
                </button>
            </div>
        </form>
    );
};

export default withRouter(CheckoutForm);
