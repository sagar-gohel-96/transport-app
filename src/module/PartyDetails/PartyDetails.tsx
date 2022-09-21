import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Table } from '../../components/common';
import { ColumnDef } from '@tanstack/react-table';
import PartyDetails1 from './utils/partiesData.json';
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Menu,
  Modal,
} from '@mantine/core';
import { AddPartyForm } from './components/AddPartyForm';
import { CirclePlus, Dots, Edit, Trash } from 'tabler-icons-react';

interface ColumnsData {
  id: number;
  partyName: string;
  contactPerson: string;
  contactNumber: string;
  address: string;
}

export const PartyDetails = () => {
  const [userData, setUserData] = useState<ColumnsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

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
      setLoading(true);
      // const data = await fetchData();
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      setUserData(PartyDetails1);
      setLoading(false);
    })();
  }, [fetchData]);

  const handleModalClose = () => {
    setOpened(false);
  };

  const handleOpenModal = () => {
    setOpened(true);
  };

  const columns = useMemo<ColumnDef<ColumnsData>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            indeterminate={table.getIsSomeRowsSelected()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            indeterminate={row.getIsSomeSelected()}
          />
        ),
      },
      {
        header: 'ID',
        accessorKey: 'id',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'partyName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'contactPerson',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'address',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'contactNumber',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: 'Action',
        cell: ({ row, getValue }) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <Dots size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<CirclePlus size={20} strokeWidth={1.5} />}>
                  Add Party
                </Menu.Item>
                <Menu.Item icon={<Edit size={20} strokeWidth={1.5} />}>
                  Edit Party
                </Menu.Item>
                <Menu.Item
                  icon={<Trash size={20} strokeWidth={1.5} />}
                  color="red"
                >
                  Delete all
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        ),
      },
    ],
    []
  );

  const tabletoolbarRightContent = (
    <Group>
      <Button onClick={handleOpenModal}>Add Party</Button>
    </Group>
  );

  return (
    <Fragment>
      <Table
        columns={columns}
        data={userData}
        pagination
        toolbarProps={{
          title: 'Party Details',
          rightContent: tabletoolbarRightContent,
          showSearch: true,
        }}
        isLoading={loading}
      />
      <Modal opened={opened} onClose={handleModalClose} size="xl">
        <AddPartyForm handleCloseModal={handleModalClose} />
      </Modal>
    </Fragment>
  );
};
