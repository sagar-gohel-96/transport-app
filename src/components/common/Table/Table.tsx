import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  FilterFn,
} from '@tanstack/react-table';

import {
  Box,
  Divider,
  Group,
  Pagination,
  Paper,
  Select,
  Stack,
  Table as MantineTable,
  Text,
  TextInput,
} from '@mantine/core';
import {
  useDebouncedState,
  usePagination as useMantinePagination,
} from '@mantine/hooks';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination?: boolean;
  title?: string;
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

export function Table<T>({ data, columns, pagination, title }: TableProps<T>) {
  const [value, setValue] = useDebouncedState('', 200);
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

  console.log('debounced', value);

  return (
    <Paper radius="sm">
      {!!title && (
        <>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            px="sm"
          >
            <Text weight={500} py="md">
              {title}
            </Text>
            <Box>
              <TextInput
                defaultValue={value}
                placeholder="Search..."
                style={{ flex: 1 }}
                onChange={(event) => setValue(event.currentTarget.value)}
              />
            </Box>
          </Box>
          <Divider />
        </>
      )}
      <div className="p-2">
        <div className="h-2" />
        <MantineTable
          horizontalSpacing="sm"
          verticalSpacing="sm"
          className="table-body"
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {/* {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null} */}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </MantineTable>

        {pagination && (
          <Stack>
            <Divider />
            <TableFooter table={table} />
          </Stack>
        )}
      </div>
    </Paper>
  );
}

function TableFooter({ table }: { table: any }) {
  const pagination = useMantinePagination({
    total: table.getPageCount(),
    // active: table.getState().pagination.pageIndex + 1,
    onChange: (page: number) => table.setPageIndex(page - 1),
    initialPage: table.getState().pagination.pageIndex,
  });

  console.log('pagination', pagination.active);

  console.log('pagination count', table.getPageCount());

  return (
    <Group position="apart" px="xs" pb="md" className="table-footer">
      <Text>
        {` Display ${
          table.getState().pagination.pageIndex *
            table.getRowModel().rows.length +
          1
        } to ${
          (table.getState().pagination.pageIndex + 1) *
          table.getRowModel().rows.length
        } of ${table.getCoreRowModel().rows.length}`}
      </Text>
      <Group>
        <Pagination
          total={table.getPageCount()}
          onChange={pagination.setPage}
          siblings={0}
          boundaries={0}
        ></Pagination>
        <Select
          placeholder="Page Show"
          data={[
            { value: '10', label: '10' },
            { value: '20', label: '20' },
            { value: '30', label: '30' },
            { value: '40', label: '40' },
            { value: '50', label: '50' },
          ]}
          value={table.getState().pagination.value}
          onChange={table.setPageSize}
        />
      </Group>
    </Group>
  );
}
