import { TYPE_TODO, ThandleUpdate } from '../TYPES_TYPES';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const EachTodoDisplayDefault = ({
    todo,
    handleUpdate,
    setIsEditNum,
    mutateUpdateLoading,
    mutateDeleteLoading,
}: {
    todo: TYPE_TODO;
    handleUpdate: ThandleUpdate;
    setIsEditNum: React.Dispatch<React.SetStateAction<string | null>>;
    mutateUpdateLoading: boolean;
    mutateDeleteLoading: boolean;
}) => {
    return (
        <>
            <div className="todo incomplete">
                <div className="todo-icon">
                    <button
                        disabled={mutateUpdateLoading || mutateDeleteLoading}
                        onClick={() =>
                            handleUpdate({
                                TodoID: todo.sk,
                                todoBODY: todo.todoBODY,
                                isCompleted: true,
                            })
                        }
                    >
                        <FontAwesomeIcon icon={faCheckSquare} />
                    </button>
                </div>
                <div className="todo-text-row">
                    <div onDoubleClick={() => setIsEditNum(todo.sk)}>
                        <div className="text">{todo.todoBODY}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EachTodoDisplayDefault;
