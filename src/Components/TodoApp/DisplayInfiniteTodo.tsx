import React from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import fetchQueryTODOByCreation from './appsync/queryTODOByCreation/fetchQueryTODOByCreation';
import fetchDeleteTodo from './appsync/deleteTodo/fetchDeleteTodo';
import fetchUpdateTodo from './appsync/updateTodo/fetchUpdateTodo';
import EachTodoDisplay from './EachTodo/EachTodoDisplay';

function useInfiniteQ() {
    return useInfiniteQuery(['todos', 'creation'], fetchQueryTODOByCreation, {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.data.queryTODOByCreation?.nextToken) {
                return lastPage.data.queryTODOByCreation.nextToken;
            }
            return undefined;
        },
    });
}

function useMutationDelete() {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteTodo, {
        onSettled: () => queryClient.invalidateQueries(),
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
    } = useInfiniteQ();

    if (isLoading) return <p>Loading</p>;
    if (error) return <p>Something went wrong</p>;

    return (
        <>
            <div>{isFetching && !isFetchingNextPage ? '...' : null}</div>
            <div>
                {infiniteResponse!.pages.map((page, index) => {
                    return page.data.queryTODOByCreation!.items.map(
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
