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
  Button,
  Divider,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Table as MantineTable,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import {
  useDebouncedState,
  usePagination as useMantinePagination,
} from '@mantine/hooks';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import { Fragment, memo, ReactNode } from 'react';
import { MoodEmpty } from 'tabler-icons-react';

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

export interface TableToolbarProps {
  title: string;
  showSearch?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  value: string;
  setValue: (value: string) => void;
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

  const tabletoolbarRightContent = (
    <Group>
      <Button>Add Party</Button>
      <Button variant="outline">Open Charts</Button>
    </Group>
  );

  const isEmptyState = table.getRowModel().rows.length === 0;

  return (
    <Paper radius="sm">
      <TableToolbar
        title="Party Details"
        value={value}
        setValue={setValue}
        // leftContent={toolbarLeftContent}
        rightContent={tabletoolbarRightContent}
      />
      <div className="p-2">
        <div className="h-2" />
        {/* <ScrollArea style={{ width: 300 }}> */}
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
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {!isEmptyState && (
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
          )}
        </MantineTable>
        {/* </ScrollArea> */}
        {isEmptyState && (
          <Stack justify="center" align="center" py={48}>
            <ThemeIcon variant="light" color="primaryBlue" size={150}>
              <MoodEmpty size={130} />
            </ThemeIcon>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text size="xl" weight={700}>
                Data Not Found
              </Text>
              <Text size="sm">Data Not Found</Text>
            </Box>
          </Stack>
        )}

        {pagination && !isEmptyState && (
          <Stack>
            <Divider />
            <TableFooter table={table} />
          </Stack>
        )}
      </div>
    </Paper>
  );
}

export const TableToolbar: React.FC<TableToolbarProps> = memo((props) => {
  const {
    title,
    showSearch = true,
    leftContent,
    rightContent,
    value,
    setValue,
  } = props;
  return (
    <Box>
      {!!title && (
        <Fragment>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            px="sm"
          >
            <Group>
              <Text weight={500} py="md">
                {title}
              </Text>
              {leftContent}
            </Group>
            <Group>
              {rightContent}
              {showSearch && (
                <Box>
                  <TextInput
                    defaultValue={value}
                    placeholder="Search..."
                    style={{ flex: 1 }}
                    onChange={(event) => setValue(event.currentTarget.value)}
                  />
                </Box>
              )}
            </Group>
          </Box>
          <Divider />
        </Fragment>
      )}
    </Box>
  );
});

function TableFooter({ table }: { table: any }) {
  const pagination = useMantinePagination({
    total: table.getPageCount(),
    // active: table.getState().pagination.pageIndex + 1,
    onChange: (page: number) => table.setPageIndex(page - 1),
    initialPage: table.getState().pagination.pageIndex,
  });

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
          value={table.getState().pagination.pageSize.toString()}
          onChange={table.setPageSize}
          sx={{ width: '4rem' }}
        />
      </Group>
    </Group>
  );
}
