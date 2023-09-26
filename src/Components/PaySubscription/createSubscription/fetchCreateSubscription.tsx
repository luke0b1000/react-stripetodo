import { API } from 'aws-amplify';
import gqlCreateSubscription from './gqlCreateSubscription';

const fetchCreateSubscription = async ({
    paymentMethodId,
}: {
    paymentMethodId: string;
}) => {
    try {
        const response = await API.graphql({
            query: gqlCreateSubscription,
            variables: { paymentMethodId },
        });
        return response;
    } catch (error) {
        console.log('fetchCreateSubscription', error);
        throw new Error(`error` + JSON.stringify(error));
    }
};

export default fetchCreateSubscription;
