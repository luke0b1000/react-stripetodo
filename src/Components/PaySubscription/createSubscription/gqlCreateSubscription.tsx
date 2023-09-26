import gql from 'graphql-tag';

const gqlCreateSubscription = gql`
    mutation gqlCreateSubscription($paymentMethodId: String!) {
        createSubscription(paymentMethodId: $paymentMethodId)
    }
`;

export default gqlCreateSubscription;
