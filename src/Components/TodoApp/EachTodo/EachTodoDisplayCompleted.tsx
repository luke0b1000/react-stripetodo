import { TYPE_TODO, ThandleUpdate, ThandleDelete } from '../TYPES_TYPES';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const EachTodoDisplayCompleted = ({
    todo,
    handleUpdate,
    handleDelete,
    mutateDeleteLoading,
    mutateUpdateLoading,
}: {
    todo: TYPE_TODO;
    handleUpdate: ThandleUpdate;
    handleDelete: ThandleDelete;
    mutateDeleteLoading: boolean;
    mutateUpdateLoading: boolean;
}) => {
    return (
        <>
            <div className="todo complete">
                <div className="todo-icon">
                    <button
                        disabled={mutateUpdateLoading || mutateDeleteLoading}
                        onClick={() => handleDelete({ TodoID: todo.sk })}
                    >
                        <FontAwesomeIcon icon={faMinusSquare} />
                    </button>
                </div>
                <div className="todo-text-row">
                    <div className="text">{todo.todoBODY}</div>
                </div>
            </div>
        </>
    );
};

export default EachTodoDisplayCompleted;
