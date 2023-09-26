import gql from 'graphql-tag';

const gqlUpdatePayment = gql`
    mutation updatePayment($paymentMethodId: String!) {
        updatePayment(paymentMethodId: $paymentMethodId)
    }
`;

export default gqlUpdatePayment;
