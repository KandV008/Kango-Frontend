import type { TableEntity } from '@/model/table/table';
import { createContext } from 'react';

type TableListContextType = {
  tableList: TableEntity[];
  setTableList: React.Dispatch<React.SetStateAction<TableEntity[]>>;
};

export const TableListContext = createContext<TableListContextType>({
  tableList: [],
  setTableList: () => {},
});
