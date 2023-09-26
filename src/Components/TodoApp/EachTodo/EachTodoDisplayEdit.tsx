import React from 'react';
import { TYPE_TODO, ThandleUpdate } from '../TYPES_TYPES';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useYupValidationResolver } from '../appsync/createTodo/useYupValidationResolver';

const todoYupSchema = yup.object({
    inputTodo: yup
        .string()
        .required('TODO Required')
        .min(5, 'need more character'),
});

const EachTodoDisplayEdit = ({
    todo,
    handleUpdate,
    setIsEditNum,
}: {
    todo: TYPE_TODO;
    handleUpdate: ThandleUpdate;
    setIsEditNum: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const resolver = useYupValidationResolver(todoYupSchema);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ inputTodo: string }>({
        resolver,
        defaultValues: {
            inputTodo: todo.todoBODY,
        },
    });
    return (
        <>
            <div className="todo edit">
                <form
                    onSubmit={handleSubmit(
                        ({ inputTodo }: { inputTodo: string }) => {
                            handleUpdate({
                                TodoID: todo.sk,
                                todoBODY: inputTodo,
                                isCompleted: false,
                            }).then(response => {
                                setIsEditNum(null);
                            });
                        }
                    )}
                >
                    <input className="inputTodo" {...register('inputTodo')} />
                    <div className="todo-edit-icon">
                        <button type="submit">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                        <button onClick={() => setIsEditNum(null)}>
                            <FontAwesomeIcon icon={faWindowClose} />
                        </button>
                        {errors &&
                            errors.inputTodo &&
                            errors.inputTodo.message && (
                                <p>{errors.inputTodo.message}</p>
                            )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default EachTodoDisplayEdit;
