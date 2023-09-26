import gql from 'graphql-tag';

const gqlCancelSubscription = gql`
    mutation cancelSubscription {
        cancelSubscription
    }
`;

export default gqlCancelSubscription;
