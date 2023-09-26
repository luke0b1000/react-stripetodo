import { TYPE_TODO, ThandleDelete } from '../TYPES_TYPES';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faIcicles } from '@fortawesome/free-solid-svg-icons';

const EachTodoDisplayFrozen = ({
    todo,
    handleDelete,
    mutateDeleteLoading,
    mutateUpdateLoading,
}: {
    todo: TYPE_TODO;
    handleDelete: ThandleDelete;
    mutateDeleteLoading: boolean;
    mutateUpdateLoading: boolean;
}) => {
    return (
        <>
            <div className="todo frozen">
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
                    <FontAwesomeIcon icon={faIcicles} />
                </div>
            </div>
        </>
    );
};

export default EachTodoDisplayFrozen;
