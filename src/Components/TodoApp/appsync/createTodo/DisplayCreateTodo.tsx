import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import fetchCreateTodo from './fetchCreateTodo';
import { useYupValidationResolver } from './useYupValidationResolver';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const todoYupSchema = yup.object({
    todoBODY: yup
        .string()
        .required('TODO Required')
        .min(5, 'need more character'),
});

function useMutationCreate() {
    const queryClient = useQueryClient();
    return useMutation(fetchCreateTodo, {
        onSettled: () => queryClient.invalidateQueries(['todos']),
    });
}

function DisplayCreateTodo() {
    const {
        mutateAsync: handleCreateTodo,
        isLoading: isLoadingHandleCreateTodo,
    } = useMutationCreate();
    const resolver = useYupValidationResolver(todoYupSchema);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{ todoBODY: string }>({ resolver });

    return (
        <>
            <div className="add-todo">
                <div className="add-todo-row">
                    <form
                        onSubmit={handleSubmit(
                            ({ todoBODY }: { todoBODY: string }) => {
                                if (isLoadingHandleCreateTodo) return;
                                handleCreateTodo({ todoBODY }).then(
                                    response => {
                                        reset(undefined, {
                                            keepValues: false,
                                        });
                                    }
                                );
                            }
                        )}
                    >
                        <input {...register('todoBODY')} />
                        <button
                            className="faPlusCircle"
                            type="submit"
                            disabled={isLoadingHandleCreateTodo}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                        {errors &&
                            errors.todoBODY &&
                            errors.todoBODY.message && (
                                <p>{errors.todoBODY.message}</p>
                            )}
                    </form>
                </div>
            </div>
        </>
    );
}
export default DisplayCreateTodo;
