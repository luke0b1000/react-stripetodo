import { API } from 'aws-amplify';
import gqlCancelSubscription from './gqlCancelSubscription';

const fetchCancelSubscription = async () => {
    try {
        const response = await API.graphql({
            query: gqlCancelSubscription,
        });
        return response;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
};

export default fetchCancelSubscription;
