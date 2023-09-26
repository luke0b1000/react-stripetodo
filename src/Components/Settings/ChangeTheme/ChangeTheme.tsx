import React from 'react';
// import { useMutation } from 'react-query';
// import fetchUpdateUSERtheme from './fetchUpdateUSERtheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

// function useMutationUpdateUSERtheme() {
//     return useMutation(fetchUpdateUSERtheme);
// }

function ChangeTheme({ themeToggler }: { themeToggler: () => void }) {
    // const { mutateAsync: handleChangeTheme } = useMutationUpdateUSERtheme();
    return (
        <>
            <div className="change-theme">
                <button
                    className="button-themeToggler"
                    onClick={() => {
                        themeToggler();
                    }}
                >
                    <FontAwesomeIcon icon={faMoon} />
                    <FontAwesomeIcon icon={faSun} />
                    Toggle Theme
                </button>
            </div>
        </>
    );
}

export default ChangeTheme;
