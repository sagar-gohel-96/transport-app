import { useMantineTheme } from "@mantine/core";
import { flexRender } from "@tanstack/react-table";
import { useContext } from "react";
import { TableContext } from "../../context/TableContext";

export const TableHeader = () => {
  const { table } = useContext(TableContext);
  const theme = useMantineTheme();
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup: any) => (
        <tr
          key={headerGroup.id}
          style={{
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.gray[8]
                : theme.colors.gray[1],
          }}
        >
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
