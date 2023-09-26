import gql from 'graphql-tag';

const gqlDeleteTodo = gql`
    mutation deleteTodo($TodoID: String!) {
        deleteTodo(TodoID: $TodoID) {
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

export default gqlDeleteTodo;
