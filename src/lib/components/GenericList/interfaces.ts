export interface GenericListProps<T> {
    items: T[];
    keyExtractor: (item: T) => string | number;
    columns: {
        key: keyof T;
        title: string;
        render?: (item: T) => string;
        sortable?: boolean;
    }[];
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    loading?: boolean;
}