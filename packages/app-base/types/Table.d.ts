type TableColumnSortDirection = 'asc' | 'desc';

type TableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  sort?: (a: any, b: any, direction: TableColumnSortDirection) => number;
  direction?: TableColumnSortDirection;
};

type TableColumns = TableColumn[];

type TableRow = { [key: string]: any };

type TableRows = TableRow[];
