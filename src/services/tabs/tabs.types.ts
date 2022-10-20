export type ReadGroupsWithFiltering = {
    eq: (column: string, EqualTo: any) => void;
    gt: (column: string, GreaterThan: any) => void;
    lt: (column: string, LessThan: any) => void;
    is: (column: string, isNull: null) => void;
    in: (column: string, ArrValue: []) => void;
    neq: (column: string, NotEqualTo: string) => void;
};

export type ReadGroupsWithFiltering2 = {
    eq: {
        column: string;
        equalTo: any;
    }
};
