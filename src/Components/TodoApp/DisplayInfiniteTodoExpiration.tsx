import React from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import fetchQueryTODOByExpiration from './appsync/queryTODOByExpiration/fetchQueryTODOByExpiration';
import fetchDeleteTodo from './appsync/deleteTodo/fetchDeleteTodo';
import fetchUpdateTodo from './appsync/updateTodo/fetchUpdateTodo';
import EachTodoDisplay from './EachTodo/EachTodoDisplay';

function useInfiniteQExp() {
    return useInfiniteQuery(
        ['todos', 'expiration'],
        fetchQueryTODOByExpiration,
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.data.queryTODOByExpiration?.nextToken) {
                    return lastPage.data.queryTODOByExpiration!.nextToken;
                }
                return undefined;
            },
        }
    );
}

function useMutationDelete() {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteTodo, {
        onSettled: () => queryClient.invalidateQueries(['todos']),
    });
}
function useMutationUpdate() {
    const queryClient = useQueryClient();
    return useMutation(fetchUpdateTodo, {
        onSettled: () => queryClient.invalidateQueries(['todos']),
    });
}

function DisplayInfiniteTodo() {
    const [isEditNum, setIsEditNum] = React.useState<string | null>(null);
    const {
        mutateAsync: handleDeleteTodo,
        isLoading: mutateDeleteLoading,
    } = useMutationDelete();
    const {
        mutateAsync: handleUpdateTodo,
        isLoading: mutateUpdateLoading,
    } = useMutationUpdate();

    const {
        data: infiniteResponse,
        isLoading,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        error,
    } = useInfiniteQExp();

    if (isLoading) return <p>Loading</p>;
    if (error) return <p>Something went wrong</p>;

    return (
        <>
            <div>{isFetching && !isFetchingNextPage ? '...' : null}</div>
            <div>
                {infiniteResponse!.pages.map((page, index) => {
                    return page.data.queryTODOByExpiration!.items.map(
                        (todo: any) => {
                            return (
                                <EachTodoDisplay
                                    key={todo.sk}
                                    todo={todo}
                                    handleUpdate={handleUpdateTodo}
                                    handleDelete={handleDeleteTodo}
                                    mutateDeleteLoading={mutateDeleteLoading}
                                    mutateUpdateLoading={mutateUpdateLoading}
                                    isEditNum={isEditNum}
                                    setIsEditNum={setIsEditNum}
                                />
                            );
                        }
                    );
                })}
            </div>
            <div className="load-more">
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
                </button>
            </div>
        </>
    );
}
export default DisplayInfiniteTodo;
