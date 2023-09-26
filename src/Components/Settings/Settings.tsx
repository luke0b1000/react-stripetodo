import React from 'react';
import { Link } from 'react-router-dom';
import ChangeTheme from './ChangeTheme/ChangeTheme';
import Header from '../Header';
import { API } from 'aws-amplify';
import { useQuery } from 'react-query';
import gqlGetUSER from '../../Components/User/gqlGetUSER';
import { TYPE_getUSER } from '../../Components/TodoApp/TYPES_TYPES';

const fetchGetUSER = async () => {
    return (await API.graphql({ query: gqlGetUSER })) as TYPE_getUSER;
};

function Settings({ themeToggler }: { themeToggler: () => void }) {
    const { data: userResponse } = useQuery('user', fetchGetUSER);
    return (
        <>
            <Header />
            <main className="main">
                <div className="settings-column">
                    <div>
                        <ChangeTheme themeToggler={themeToggler} />
                    </div>
                    <div>
                        Your credit card {userResponse!.data.getUSER.Slast4} -
                        <Link to="/updatePayment">UpdatePayment</Link>
                        <div>
                            <Link to="/cancelSubscription">
                                Cancel Subscription
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <p>&copy; CompanyX</p>
            </footer>
        </>
    );
}

export default Settings;
