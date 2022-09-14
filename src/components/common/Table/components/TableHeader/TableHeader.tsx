import { flexRender } from '@tanstack/react-table';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';

export const TableHeader = () => {
  const { table } = useContext(TableContext);
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup: any) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => {
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
  );
};
