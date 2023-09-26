import { API } from 'aws-amplify';
import gqlDeleteTodo from './gqlDeleteTodo';

const fetchDeleteTodo = async ({ TodoID }: { TodoID: string }) => {
    try {
        return await API.graphql({
            query: gqlDeleteTodo,
            variables: { TodoID },
        });
    } catch (error) {
        throw new Error('error deleting')
    }
};

export default fetchDeleteTodo;
