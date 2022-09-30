import { Group, Pagination, Select, Text } from '@mantine/core';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';
import { usePagination as useMantinePagination } from '@mantine/hooks';

export function TableFooter() {
  const { table } = useContext(TableContext);

  const pagination = useMantinePagination({
    total: table.getPageCount(),
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
          styles={(theme) => ({
            item: {
              '&[data-active]': {
                backgroundColor: 'white',
                borderWidth: '1px',
                borderColor: 'black',
                color: 'black',
              },
            },
          })}
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
