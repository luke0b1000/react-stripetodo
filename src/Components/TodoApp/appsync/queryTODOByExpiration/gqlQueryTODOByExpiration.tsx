import gql from 'graphql-tag';

const gqlQueryTODOByExpiration = gql`
    query queryTODOByExpiration($limit: Int, $nextToken: String) {
        queryTODOByExpiration(limit: $limit, nextToken: $nextToken) {
            items {
                G1PK
                G1SK
                T
                createdTime
                isCompleted
                modifiedTime
                pk
                todoBODY
                ttl
                sk
            }
            nextToken
        }
    }
`;

export default gqlQueryTODOByExpiration;
