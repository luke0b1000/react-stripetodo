import { API } from 'aws-amplify';
import gqlQueryTODOByCreation from './gqlQueryTODOByCreation';
import { APPSYNC_RESPONSE } from '../../TYPES_TYPES';

const fetchQueryTODOByCreation = async ({ pageParam = '' }) => {
    return (await API.graphql({
        query: gqlQueryTODOByCreation,
        variables: { nextToken: pageParam, limit: 10 },
    })) as APPSYNC_RESPONSE;
};

export default fetchQueryTODOByCreation;
