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
import { useAreas } from "../../hooks";
import { FetchAreaData } from "../../types";
import { AddArea } from "./components";

export const AreasList = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [AreaRecord, setAreaRecord] = useState<FetchAreaData>();
  const { getAreas, addArea, updateArea, deleteArea } = useAreas();

  const handleEditArea = (data: FetchAreaData) => {
    setAreaRecord(data);
    setOpened(true);
  };

  const handleAreaDelete = useCallback(
    async (id: string) => {
      const response: any = await deleteArea(id);
      if (response.data.success) {
        getAreas.refetch();
        showNotification({
          title: "Area",
          message: response.data.message,
        });
      } else {
        showNotification({
          title: "Area",
          message: response.data.message,
        });
      }
    },
    [deleteArea, getAreas]
  );

  const columns = useMemo<ColumnDef<FetchAreaData>[]>(
    () => [
      {
        header: "#",
        // accessorKey: "AreaCode",
        cell: (info) => parseInt(info.row.id) + 1,
        footer: (props) => props.column.id,
      },
      {
        header: "Area Name",
        accessorKey: "areaName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "City",
        accessorKey: "city",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Contact Person",
        accessorKey: "name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div
            style={{
              display: "flex",
              // justifyContent: "center",
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
                  onClick={() => handleEditArea(row.original)}
                >
                  Edit Area
                </Menu.Item>
                <Menu.Item
                  icon={<Trash size={20} strokeWidth={1.5} />}
                  color="red"
                  onClick={() =>
                    openConfirmModal({
                      title: "Delete your Area",
                      centered: true,
                      children: (
                        <Text size="sm">
                          Are you sure you want to delete your Area?
                        </Text>
                      ),
                      labels: {
                        confirm: "Delete Area",
                        cancel: "No don't delete it",
                      },
                      confirmProps: { color: "red" },
                      onCancel: () => console.log("Cancel"),
                      onConfirm: () => handleAreaDelete(row.original._id),
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
    [handleAreaDelete]
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
        Area
      </Button>
    </Group>
  );

  return (
    <Fragment>
      <Table
        columns={columns}
        data={getAreas.data ? getAreas.data : []}
        pagination
        toolbarProps={{
          title: "Area Details",
          showSearch: true,
          rightContent: tabletoolbarRightContent,
        }}
        isLoading={getAreas.isLoading}
        LoadingType="relative"
      />
      <Modal opened={opened} onClose={handleModalClose} size="xl">
        <AddArea
          handleCloseModal={handleModalClose}
          data={AreaRecord}
          addArea={addArea}
          updateArea={updateArea}
          refetch={getAreas.refetch}
        />
      </Modal>
    </Fragment>
  );
};