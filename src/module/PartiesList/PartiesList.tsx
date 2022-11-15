import {
  ActionIcon,
  Button,
  // Checkbox,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dots, Edit, Plus, Trash } from "tabler-icons-react";
import { Table } from "../../components/common";
import { useParties } from "../../hooks";
import { FetchPartiesData } from "../../types";

export const PartiesList = () => {
  const param = useParams();
  const { getParties, deleteParty } = useParties(param.id!);
  const navigate = useNavigate();
  const id = "00000000000000000000000";

  const handlePartyDelete = useCallback(
    async (id: string) => {
      const response: any = await deleteParty(id);
      if (response.data.success) {
        getParties.refetch();
        showNotification({
          title: "Party",
          message: response.data.message,
        });
      } else {
        showNotification({
          title: "Party",
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
        header: "#",
        // accessorKey: "partyCode",
        cell: (info) => parseInt(info.row.id) + 1,
        footer: (props) => props.column.id,
      },
      {
        header: "Parties Name",
        accessorKey: "name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Conatct Person",
        accessorKey: "contactPerson",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Address",
        accessorKey: "address",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Contact Numebr",
        accessorKey: "phoneNumber",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <Dots size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<Edit size={20} strokeWidth={1.5} />}
                  // onClick={() => handleEditPartty(row.original)}
                  onClick={() => navigate(`/parties/${row.original._id}`)}
                >
                  Edit Party
                </Menu.Item>
                <Menu.Item
                  icon={<Trash size={20} strokeWidth={1.5} />}
                  color="red"
                  onClick={() =>
                    openConfirmModal({
                      title: "Delete your Party",
                      centered: true,
                      children: (
                        <Text size="sm">
                          Are you sure you want to delete your Party?
                        </Text>
                      ),
                      labels: {
                        confirm: "Delete Party",
                        cancel: "No don't delete it",
                      },
                      confirmProps: { color: "red" },
                      onCancel: () => console.log("Cancel"),
                      onConfirm: () => handlePartyDelete(row.original._id),
                    })
                  }
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        ),
      },
    ],
    [handlePartyDelete, navigate]
  );

  const tabletoolbarRightContent = (
    <Group>
      <Button
        onClick={() => navigate(`/parties/${id}`)}
        leftIcon={<Plus />}
        variant="outline"
      >
        Party
      </Button>
    </Group>
  );

  return (
    <Table
      columns={columns}
      data={getParties.data ? getParties.data : []}
      pagination
      toolbarProps={{
        title: "Party Details",
        showSearch: true,
        rightContent: tabletoolbarRightContent,
      }}
      isLoading={getParties.isLoading}
      LoadingType="relative"
    />
  );
};
