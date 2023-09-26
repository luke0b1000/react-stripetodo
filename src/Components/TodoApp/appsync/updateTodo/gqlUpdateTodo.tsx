import gql from 'graphql-tag';

const gqlUpdateTodo = gql`
    mutation updateTodo(
        $TodoID: String!
        $todoBODY: String!
        $isCompleted: Boolean!
    ) {
        updateTodo(
            TodoID: $TodoID
            todoBODY: $todoBODY
            isCompleted: $isCompleted
        ) {
            ttl
            todoBODY
            sk
            pk
            modifiedTime
            createdTime
            isCompleted
            T
            G1SK
            G1PK
        }
    }
`;

export default gqlUpdateTodo;
