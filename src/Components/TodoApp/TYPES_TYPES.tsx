export enum TYPE_T {
    T,
    E,
    U,
}
export type TYPE_TODO = {
    pk: string;
    sk: string;
    T: TYPE_T;
    G1PK: string;
    G1SK: string;
    createdTime: number;
    modifiedTime: number;
    isCompleted: boolean;
    todoBODY: string;
};

export type ThandleUpdate = ({
    TodoID,
    todoBODY,
    isCompleted,
}: TupdateTODOinput) => Promise<void>;

export type TupdateTODOinput = {
    TodoID: string;
    todoBODY: string;
    isCompleted: boolean;
};

export type ThandleDelete = ({ TodoID }: { TodoID: string }) => Promise<void>;

export type TYPE_queryTODOByExpiration = {
    queryTODOByExpiration: {
        items: TYPE_TODO[];
        nextToken: string;
    } | null;
};
export type TYPE_queryTODOByCreation = {
    queryTODOByCreation: {
        items: TYPE_TODO[];
        nextToken: string;
    } | null;
};

export type TYPE_USER = {
    pk: string;
    sk: string;
    G1PK: string;
    G1SK: string;
    T: TYPE_T;
    lastLogin: string;
    theme: string;
    email: string;
    Speriod_end: string;
    Ssubscription: string;
    Sproduct: string;
    SpaymentMethod: string;
    Slast4: string;
};

export type TYPE_getUSER = {
    data: {
        getUSER: TYPE_USER;
    };
    isLoading?: boolean;
};

export type APPSYNC_RESPONSE = {
    data: TYPE_queryTODOByCreation;
};
export type APPSYNC_RESPONSE2 = {
    data: TYPE_queryTODOByExpiration;
};
