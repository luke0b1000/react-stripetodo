import gql from 'graphql-tag';

const gqlQueryTODOByCreation = gql`
    query queryTODOByCreation($limit: Int, $nextToken: String) {
        queryTODOByCreation(limit: $limit, nextToken: $nextToken) {
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

export default gqlQueryTODOByCreation;
