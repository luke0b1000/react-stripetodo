import gql from 'graphql-tag';

const gqlUpdateUSERtheme = gql`
    mutation updateUSERtheme($theme: String!) {
        updateUSERtheme(theme: $theme) {
            pk
            sk
            G1PK
            G1SK
            T
            lastLogin
            theme
            email
            Speriod_end
            Ssubscription
            Sproduct
            SpaymentMethod
            Slast4
        }
    }
`;

export default gqlUpdateUSERtheme;
