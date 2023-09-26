import React from 'react';

function DisplaySortBy({
    sortBy,
    setSortBy,
}: {
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<'creation' | 'expiration'>>;
}) {
    const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as 'creation' | 'expiration');
    };
    return (
        <>
            <div className="sort">
                Sort by:
                <select value={sortBy} onChange={e => handleSortBy(e)}>
                    <option value="creation">creation</option>
                    <option value="expiration">expiration</option>
                </select>
            </div>
        </>
    );
}

export default DisplaySortBy;
