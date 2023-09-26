import { API } from 'aws-amplify';
import gqlCreateTodo from './gqlCreateTodo';

const fetchCreateTodo = async ({ todoBODY }: { todoBODY: string }) => {
    return await API.graphql({
        query: gqlCreateTodo,
        variables: { todoBODY },
    });
};

export default fetchCreateTodo;
