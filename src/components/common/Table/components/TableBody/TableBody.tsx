import { flexRender } from '@tanstack/react-table';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';

export const TableBody = () => {
  const { table } = useContext(TableContext);
  return (
    <tbody>
      {table.getRowModel().rows.map((row: any) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell: any) => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
