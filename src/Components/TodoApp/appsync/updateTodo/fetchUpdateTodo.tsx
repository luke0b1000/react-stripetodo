import { API } from 'aws-amplify';
import gqlUpdateTodo from './gqlUpdateTodo';

const fetchUpdateTodo = async ({
    TodoID,
    todoBODY,
    isCompleted,
}: {
    TodoID: string;
    todoBODY: string;
    isCompleted: boolean;
}) => {
    try {
        const resp = await API.graphql({
            query: gqlUpdateTodo,
            variables: { TodoID, todoBODY, isCompleted },
        });
        return resp;
    } catch (error) {
        throw new Error(error);
    }
};

export default fetchUpdateTodo;
