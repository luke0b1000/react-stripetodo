import React from 'react';
import { Auth } from 'aws-amplify';
import { useMutation } from 'react-query';
import fetchCancelSubscription from '../PaySubscription/cancelSubscription/fetchCancelSubscription';
import Header from '../Header';

function Subscription() {
    const {
        mutateAsync: handleCancelSubscription,
        isLoading,
        isSuccess,
    } = useMutation(fetchCancelSubscription, {
        onSuccess: async data => {
            await Auth.signOut().then(resp => {
                window.location.reload();
            });
        },
    });

    return (
        <>
            <Header />
            <main className="main">
                <div className="subscription-column">
                    <p>Are you sure you want to CANCEL?</p>
                    <button
                        disabled={isLoading || isSuccess}
                        className="subscription-cancel"
                        onClick={() => {
                            handleCancelSubscription();
                        }}
                    >
                        Yes
                    </button>
                </div>
            </main>
        </>
    );
}

export default Subscription;
