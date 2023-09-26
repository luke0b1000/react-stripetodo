import React from 'react';
import Header from '../Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckSquare,
    faMinusSquare,
    faUndo,
    faIcicles,
} from '@fortawesome/free-solid-svg-icons';

function Help() {
    return (
        <>
            <Header />
            <main className="main">
                <div className="help-column">
                    <div className="help-row">
                        <FontAwesomeIcon icon={faCheckSquare} />
                        <div className="help-text">
                            Click the check box to mark the todo item as
                            completed.
                        </div>
                    </div>
                    <div className="help-row">
                        <FontAwesomeIcon icon={faMinusSquare} />
                        <div className="help-text">
                            Click the minus box to delete the todo item.
                        </div>
                    </div>
                    <div className="help-row">
                        <FontAwesomeIcon icon={faUndo} />
                        <div className="help-text">
                            Click the undo button to revert back to incomplete.
                        </div>
                    </div>
                    <div className="help-row">
                        <div className="help-text">
                            Double Click the todo item will allow you to edit
                            the item.
                        </div>
                    </div>
                    <div className="help-row">
                        <FontAwesomeIcon icon={faIcicles} />
                        <div className="help-text">
                            Todo Item has not been changed in a month.
                        </div>
                    </div>
                    <div className="help-row">
                        <div className="help-text">
                            Todo Item will delete after a month of inactivity.
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

export default Help;
