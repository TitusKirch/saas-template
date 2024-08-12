type TableColumnSortDirection = 'asc' | 'desc';

type TableColumn = {
  id: string;
  label?: string;
  sortable?: boolean;
  sort?: (a: any, b: any, direction: TableColumnSortDirection) => number;
  direction?: TableColumnSortDirection;
};

type TableColumns = TableColumn[];

type TableState = {
  selectedColumns?: string[];
  sortColumn?: string;
  sortDirection?: TableColumnSortDirection;
};
