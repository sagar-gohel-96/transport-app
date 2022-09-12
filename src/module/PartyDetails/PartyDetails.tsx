import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Table } from '../../components/common';
import { ColumnDef } from '@tanstack/react-table';
import { Tabs } from '@mantine/core';

interface ColumnsData {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const PartyDetails = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setUserData(data);
    })();
  }, [fetchData]);

  const columns = useMemo<ColumnDef<ColumnsData>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'userId',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'title',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'completed',
        cell: (info) => (info.getValue() ? 'Success' : 'Incomplete'),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  return (
    <Table columns={columns} data={userData} pagination title="Party Details" />
  );
};
