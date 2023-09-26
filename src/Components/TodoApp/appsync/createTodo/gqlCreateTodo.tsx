import gql from 'graphql-tag';

const gqlCreateTodo = gql`
    mutation createTodo($todoBODY: String!) {
        createTodo(todoBODY: $todoBODY) {
            pk
            sk
            G1PK
            G1SK
            T
            todoBODY
            isCompleted
            createdTime
            modifiedTime
            ttl
        }
    }
`;

export default gqlCreateTodo;
