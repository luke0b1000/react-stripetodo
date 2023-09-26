import React from 'react';
import DisplayInfiniteTodo from './DisplayInfiniteTodo';
import DisplayInfiniteTodoExpiration from './DisplayInfiniteTodoExpiration';
import DisplayCreateTodo from './appsync/createTodo/DisplayCreateTodo';
import DisplaySortBy from './DisplaySortBy';
import Header from '../Header';

function TodoApp() {
    const [sortBy, setSortBy] = React.useState<'creation' | 'expiration'>(
        'creation'
    );
    return (
        <>
            <Header />
            <main className="main">
                <DisplayCreateTodo />
                <DisplaySortBy sortBy={sortBy} setSortBy={setSortBy} />
                {sortBy === 'creation' ? (
                    <DisplayInfiniteTodo />
                ) : (
                    <DisplayInfiniteTodoExpiration />
                )}
            </main>
            <footer>
                <p>&copy; CompanyX</p>
            </footer>
        </>
    );
}

export default TodoApp;
