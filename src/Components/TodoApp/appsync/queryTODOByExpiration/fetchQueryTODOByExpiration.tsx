import { API } from 'aws-amplify';
import gqlQueryTODOByExpiration from './gqlQueryTODOByExpiration';
import { APPSYNC_RESPONSE2 } from '../../TYPES_TYPES';

const fetchQueryTODOByExpiration = async ({ pageParam = '' }) => {
    return (await API.graphql({
        query: gqlQueryTODOByExpiration,
        variables: { nextToken: pageParam, limit: 10 },
    })) as APPSYNC_RESPONSE2;
};

export default fetchQueryTODOByExpiration;
