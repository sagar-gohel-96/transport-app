import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  FilterFn,
} from '@tanstack/react-table';

import { Divider, Paper, Stack, Table as MantineTable } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { ReactNode, useMemo } from 'react';
import { TableContext } from './context/TableContext';
import {
  TableHeader,
  TableBody,
  TableFooter,
  TableToolbar,
} from './components';
import { EmptyState } from '../EmptyState';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export interface TableToolbarProps {
  title: string;
  showSearch?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  // value: string;
  // setValue: (value: string) => void;
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: boolean;
  toolbarProps: TableToolbarProps;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function Table<T>({
  data,
  columns,
  pagination,
  toolbarProps,
}: TableProps<T>) {
  const [value, setValue] = useDebouncedState('', 50);

  const isApiDataFound = useMemo(() => !!data.length, [data.length]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter: value,
    },
    onGlobalFilterChange: setValue,
    globalFilterFn: fuzzyFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const isEmptyState = table.getRowModel().rows.length === 0;

  return (
    <TableContext.Provider
      value={{
        isEmptyState,
        value,
        setValue,
        table,
        toolbarProps,
      }}
    >
      <Paper radius="sm">
        <TableToolbar {...toolbarProps} />
        <MantineTable
          horizontalSpacing="sm"
          verticalSpacing="sm"
          className="table-body"
        >
          <TableHeader />
          {!isEmptyState && <TableBody />}
        </MantineTable>

        {isEmptyState && <EmptyState isApiDataFound={isApiDataFound} />}

        {pagination && !isEmptyState && (
          <Stack>
            <Divider />
            <TableFooter />
          </Stack>
        )}
      </Paper>
    </TableContext.Provider>
  );
}
