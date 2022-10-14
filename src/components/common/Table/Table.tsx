import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  FilterFn,
} from "@tanstack/react-table";

import {
  Box,
  Divider,
  Paper,
  Stack,
  Table as MantineTable,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { ReactNode, useMemo, useRef, useState } from "react";
import { TableContext } from "./context/TableContext";
import {
  TableHeader,
  TableBody,
  TableFooter,
  TableToolbar,
} from "./components";
import { EmptyState } from "../EmptyState";
import { LoadingIndicator, LoadingType } from "../LoadingIndicator";

declare module "@tanstack/table-core" {
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
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: boolean;
  toolbarProps: TableToolbarProps;
  isLoading: boolean;
  LoadingType?: LoadingType;
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
  isLoading,
  LoadingType,
}: TableProps<T>) {
  const [value, setValue] = useDebouncedState("", 50);
  const [rowSelection, setRowSelection] = useState({});

  const isApiDataFound = useMemo(() => !!data.length, [data.length]);

  const tableRef = useRef(null);
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter: value,
      rowSelection,
    },
    onGlobalFilterChange: setValue,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const isEmptyState = table.getRowModel().rows.length === 0;
  // const isEmptyState = false;

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
      <Paper
        radius="sm"
        sx={{ minHeight: "40rem", display: "flex", flexDirection: "column" }}
      >
        <TableToolbar {...toolbarProps} />
        {isLoading ? (
          <LoadingIndicator
            isLoading={isLoading}
            // position={isApiDataFound ? "absolute" : "relative"}
            loadingType={LoadingType!}
          />
        ) : (
          <Box sx={{ flex: "1", paddingBottom: 16 }}>
            <MantineTable
              horizontalSpacing="sm"
              verticalSpacing="sm"
              className="table-body"
              style={{ borderBottom: "1px", borderColor: "red" }}
              ref={tableRef}
            >
              <TableHeader />
              {!isEmptyState && <TableBody />}
            </MantineTable>
            <Divider />
          </Box>
        )}

        {!isLoading && isEmptyState && (
          <EmptyState isApiDataFound={isApiDataFound} />
        )}

        {pagination && !isEmptyState && (
          <Stack>
            <TableFooter />
          </Stack>
        )}
      </Paper>
    </TableContext.Provider>
  );
}
