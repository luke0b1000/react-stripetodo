import { API } from 'aws-amplify';
import gqlUpdateUSERtheme from './gqlUpdateUSERtheme';

async function fetchUpdateUSERtheme({ theme }: { theme: string }) {
    return await API.graphql({
        query: gqlUpdateUSERtheme,
        variables: { theme },
    });
}

export default fetchUpdateUSERtheme;
