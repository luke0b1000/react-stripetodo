import { API } from 'aws-amplify';
import gqlUpdatePayment from './gqlUpdatePayment';

async function fetchUpdatePayment({
    paymentMethodId,
}: {
    paymentMethodId: string;
}) {
    return await API.graphql({
        query: gqlUpdatePayment,
        variables: { paymentMethodId },
    });
}

export default fetchUpdatePayment;
