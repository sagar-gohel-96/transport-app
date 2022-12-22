import {
  ActionIcon,
  Button,
  // Checkbox,
  Group,
  // Select,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Edit, FileSpreadsheet, Plus, Trash } from 'tabler-icons-react';
import { PdfIcon } from '../../assets/icons';
import { Table } from '../../components/common';
import { useParties } from '../../hooks';
import { FetchPartiesData } from '../../types';
import { openExportCSV, openExportPDF } from '../../utils';

export const PartiesList = () => {
  const param = useParams();
  const { getParties, deleteParty } = useParties(param.id!);
  const navigate = useNavigate();
  // const [exportOption, setExportOption] = useState<string | null>("pdf");
  const id = '00000000000000000000000';

  const handlePartyDelete = useCallback(
    async (id: string) => {
      const response: any = await deleteParty(id);
      if (response.data.success) {
        getParties.refetch();
        showNotification({
          title: 'Party',
          message: response.data.message,
        });
      } else {
        showNotification({
          title: 'Party',
          message: response.data.message,
        });
      }
    },
    [deleteParty, getParties]
  );

  const columns = useMemo<ColumnDef<FetchPartiesData>[]>(
    () => [
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <Checkbox
      //       checked={table.getIsAllRowsSelected()}
      //       onChange={table.getToggleAllRowsSelectedHandler()}
      //       indeterminate={table.getIsSomeRowsSelected()}
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       checked={row.getIsSelected()}
      //       onChange={row.getToggleSelectedHandler()}
      //       indeterminate={row.getIsSomeSelected()}
      //     />
      //   ),
      // },
      {
        header: '#',
        // accessorKey: "partyCode",
        cell: (info) => parseInt(info.row.id) + 1,
        footer: (props) => props.column.id,
      },
      {
        header: 'Parties Name',
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: 'Address',
        accessorKey: 'address',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: 'Contact Numebr',
        accessorKey: 'phoneNumber',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: 'Action',
        cell: ({ row }) => (
          <Group spacing={4}>
            <UnstyledButton
              onClick={() => navigate(`/parties/${row.original._id}`)}
            >
              <Edit />
            </UnstyledButton>
            <UnstyledButton
              onClick={() =>
                openConfirmModal({
                  title: 'Delete your Tranaction ',
                  centered: true,
                  children: (
                    <Text size="sm">
                      Are you sure you want to delete your ?
                    </Text>
                  ),
                  labels: {
                    confirm: 'Delete Transaction',
                    cancel: "No don't delete it",
                  },
                  confirmProps: { color: 'red' },
                  onCancel: () => console.log('Cancel'),
                  onConfirm: () => handlePartyDelete(row.original._id),
                })
              }
            >
              <Trash color="red" />
            </UnstyledButton>
          </Group>
        ),
      },
    ],
    [handlePartyDelete, navigate]
  );

  const handleAllPrint = (data: FetchPartiesData[]) => {
    openExportPDF({
      items: data,
      title: 'Parties-Data',
      includeFields: [
        'name',
        'category',
        'address',
        'city',
        'pincode',
        'district',
        'state',
        'contactPerson',
        'phoneNumber',
        'email',
        'GSTIN',
        'PAN',
      ],
    });
  };

  const handleJSONToCSV = (data: FetchPartiesData) => {
    openExportCSV({
      items: data,
      filename: 'Parties-Data',
      excludeFields: ['_id', '__v'],
    });
  };

  const tabletoolbarRightContent = (
    <Group>
      <Button
        onClick={() => navigate(`/parties/${id}`)}
        leftIcon={<Plus />}
        variant="outline"
      >
        Party
      </Button>

      <ActionIcon
        variant="outline"
        size="lg"
        onClick={() => handleAllPrint(getParties.data ? getParties.data : [])}
      >
        <PdfIcon height={20} stroke="2" />
      </ActionIcon>
      <ActionIcon
        variant="outline"
        size="lg"
        onClick={() => handleJSONToCSV(getParties.data ? getParties.data : [])}
      >
        <FileSpreadsheet />
      </ActionIcon>
    </Group>
  );

  return (
    <Table
      columns={columns}
      data={getParties.data ? getParties.data : []}
      pagination
      toolbarProps={{
        title: 'Party Details',
        showSearch: true,
        rightContent: tabletoolbarRightContent,
      }}
      isLoading={getParties.isLoading}
      LoadingType="relative"
    />
  );
};
