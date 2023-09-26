import { TYPE_TODO } from '../TYPES_TYPES';
import EachTodoDisplayDefault from './EachTodoDisplayDefault';
import EachTodoDisplayEdit from './EachTodoDisplayEdit';
import EachTodoDisplayCompleted from './EachTodoDisplayCompleted';
import EachTodoDisplayCompletedWithIn1Day from './EachTodoDisplayCompletedWithIn1Day';
import EachTodoDisplayFrozen from './EachTodoDisplayFrozen';

const currentUnixtimestamp = Math.floor(Date.now() / 1000);

const EachTodoDisplay = ({
    todo,
    handleUpdate,
    handleDelete,
    isEditNum,
    setIsEditNum,
    mutateDeleteLoading,
    mutateUpdateLoading,
}: {
    todo: TYPE_TODO;
    handleUpdate: any;
    handleDelete: any;
    isEditNum: string | null;
    setIsEditNum: React.Dispatch<React.SetStateAction<string | null>>;
    mutateDeleteLoading: boolean;
    mutateUpdateLoading: boolean;
}) => {
    if (todo.sk === isEditNum) {
        return (
            <EachTodoDisplayEdit
                todo={todo}
                handleUpdate={handleUpdate}
                setIsEditNum={setIsEditNum}
            />
        );
    } else if (
        todo.isCompleted === true &&
        todo.modifiedTime > currentUnixtimestamp - 86400
    ) {
        return (
            <EachTodoDisplayCompletedWithIn1Day
                todo={todo}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                mutateDeleteLoading={mutateDeleteLoading}
                mutateUpdateLoading={mutateUpdateLoading}
            />
        );
    } else if (todo.isCompleted === true) {
        // GREATER THAN A DAY, so don't show UNDO
        return (
            <EachTodoDisplayCompleted
                todo={todo}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                mutateDeleteLoading={mutateDeleteLoading}
                mutateUpdateLoading={mutateUpdateLoading}
            />
        );
    } else if (todo.modifiedTime < currentUnixtimestamp - 2592000) {
        return (
            <EachTodoDisplayFrozen
                todo={todo}
                handleDelete={handleDelete}
                mutateDeleteLoading={mutateDeleteLoading}
                mutateUpdateLoading={mutateUpdateLoading}
            />
        );
    }

    return (
        <EachTodoDisplayDefault
            todo={todo}
            handleUpdate={handleUpdate}
            setIsEditNum={setIsEditNum}
            mutateDeleteLoading={mutateDeleteLoading}
            mutateUpdateLoading={mutateUpdateLoading}
        />
    );
};

export default EachTodoDisplay;
