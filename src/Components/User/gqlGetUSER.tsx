import gql from 'graphql-tag';

const gqlGetUSER = gql`
    query getUSER {
        getUSER {
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
            Slast4
        }
    }
`;

export default gqlGetUSER;
