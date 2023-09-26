import React from 'react';
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Theme/GlobalStyles';
import { lightTheme, darkTheme } from './Theme/Themes';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify, { API } from 'aws-amplify';
import TodoApp from './Components/TodoApp/TodoApp';
import Settings from './Components/Settings/Settings';
import Subscription from './Components/Subscription/Subscription';
import PaySubscription from './Components/PaySubscription/PaySubscription';
import UpdatePayment from './Components/UpdatePayment/UpdatePayment';
import Help from './Components/Help/Help';
import { useMutation } from 'react-query';
import fetchUpdateUSERtheme from './Components/Settings/ChangeTheme/fetchUpdateUSERtheme';

import { useQuery } from 'react-query';
import gqlGetUSER from './Components/User/gqlGetUSER';
import { TYPE_getUSER } from './Components/TodoApp/TYPES_TYPES';

import awsconfig from './awsconfig';
Amplify.configure(awsconfig);

const fetchGetUSER = async () => {
    return (await API.graphql({ query: gqlGetUSER })) as TYPE_getUSER;
};

function isUserActiveFunc({ Speriod_end }: { Speriod_end: string }) {
    // return false if Speriod_end is less than Date.now()
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const INT_Speriod_end = parseInt(Speriod_end);

    if (INT_Speriod_end < currentTimestamp) return false;
    return true;
}

function MyTodo() {
    return (
        <>
            <TodoApp />
        </>
    );
}

function useMutationUpdateUSERtheme() {
    return useMutation(fetchUpdateUSERtheme);
}
export const useThemeMode = ({
    themeResponse,
}: {
    themeResponse: 'light' | 'dark';
}) => {
    const [theme, setTheme] = React.useState(themeResponse);
    const { mutateAsync: handleChangeTheme } = useMutationUpdateUSERtheme();

    const setMode = (mode: 'light' | 'dark') => {
        setTheme(mode);
    };

    const themeToggler: () => void = () => {
        theme === 'light' ? setMode('dark') : setMode('light');
        const oppositeTheme = theme === 'light' ? 'dark' : 'light';
        handleChangeTheme({ theme: oppositeTheme });
    };

    return [theme, themeToggler] as const;
};

function RouteApp({
    userResponse,
}: {
    userResponse: TYPE_getUSER | undefined;
}) {
    const themeResponse = userResponse!.data.getUSER.theme as 'light' | 'dark';
    const [theme, themeToggler] = useThemeMode({ themeResponse });
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    const isUserActive = isUserActiveFunc({
        Speriod_end: userResponse!.data.getUSER.Speriod_end,
    });
    const customerId = userResponse!.data.getUSER.G1PK;

    return (
        <>
            <ThemeProvider theme={themeMode}>
                <GlobalStyles />
                <Router>
                    <Switch>
                        <Route path="/pay">
                            {isUserActive ? (
                                <Redirect to="/" />
                            ) : (
                                <>
                                    <PaySubscription customerId={customerId} />
                                </>
                            )}
                        </Route>
                        <Route path="/cancelSubscription">
                            {isUserActive ? (
                                <>
                                    <Subscription />
                                </>
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>
                        <Route path="/settings">
                            {isUserActive ? (
                                <>
                                    <Settings themeToggler={themeToggler} />
                                </>
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>
                        <Route path="/updatePayment">
                            {isUserActive ? (
                                <>
                                    <UpdatePayment />
                                </>
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>
                        <Route path="/help">
                            {isUserActive ? (
                                <>
                                    <Help />
                                </>
                            ) : (
                                <Redirect to="/" />
                            )}
                        </Route>
                        <Route>
                            {isUserActive ? <MyTodo /> : <Redirect to="/pay" />}
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </>
    );
}
function App() {
    const { data: userResponse, isLoading, error } = useQuery(
        'user',
        fetchGetUSER
    );

    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }

    if (!isLoading) {
        if (!userResponse) return <p>Loading</p>;
        return <RouteApp userResponse={userResponse} />;
    }

    return <>Loading dude</>;
}

export default withAuthenticator(App);
