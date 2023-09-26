import { TYPE_TODO, ThandleUpdate, ThandleDelete } from '../TYPES_TYPES';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';

const EachTodoDisplayCompletedWithIn1Day = ({
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
            <div className="todo complete undo">
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
                    <button
                        onClick={() =>
                            handleUpdate({
                                TodoID: todo.sk,
                                todoBODY: todo.todoBODY,
                                isCompleted: false,
                            })
                        }
                    >
                        <FontAwesomeIcon icon={faUndo} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default EachTodoDisplayCompletedWithIn1Day;
