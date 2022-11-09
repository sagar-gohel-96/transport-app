import {
  ActionIcon,
  Button,
  // Checkbox,
  Group,
  Menu,
  Modal,
  Text,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment, useCallback, useMemo, useState } from "react";
import { Dots, Edit, Plus, Trash } from "tabler-icons-react";
import { Table } from "../../components/common";
import { useParties } from "../../hooks";
import { FetchPartiesData } from "../../types";
import { AddPartiesForm } from "./components";

export const PartiesDetails = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [partyRecord, setPartyRecord] = useState<FetchPartiesData>();
  const { getParties, addParty, deleteParty, updateParty } = useParties();

  const handleEditPartty = (data: FetchPartiesData) => {
    setPartyRecord(data);
    setOpened(true);
  };

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
                  onClick={() => handleEditPartty(row.original)}
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
    [handlePartyDelete]
  );

  const handleModalClose = () => {
    setOpened(false);
  };

  const handleOpenModal = () => {
    setOpened(true);
  };

  const tabletoolbarRightContent = (
    <Group>
      <Button onClick={handleOpenModal} leftIcon={<Plus />} variant="outline">
        Party
      </Button>
    </Group>
  );

  return (
    <Fragment>
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
      <Modal opened={opened} onClose={handleModalClose} size="xl">
        <AddPartiesForm
          handleCloseModal={handleModalClose}
          data={partyRecord}
          addParty={addParty}
          updateParty={updateParty}
          refetch={getParties.refetch}
        />
      </Modal>
    </Fragment>
  );
};
