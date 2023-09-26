import React from 'react';
import { Link } from 'react-router-dom';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
        <>
            <header className="header">
                <Link to="/">
                    <h1>Logo Goes Here</h1>
                </Link>
                <nav>
                    <Link to="/help">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </Link>
                    <Link to="/settings">Settings</Link>
                    <AmplifySignOut />
                </nav>
            </header>
        </>
    );
}

export default Header;
