import {
  ActionIcon,
  Button,
  // Checkbox,
  Group,
  Modal,
  Select,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment, useCallback, useMemo, useState } from "react";
import { Edit, FileExport, Plus, Trash } from "tabler-icons-react";
import { Table } from "../../components/common";
import { useAreas } from "../../hooks";
import { FetchAreaData } from "../../types";
import { openExportCSV, openExportPDF } from "../../utils";
import { AddArea } from "./components";

export const AreasList = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [AreaRecord, setAreaRecord] = useState<FetchAreaData>();
  const { getAreas, addArea, updateArea, deleteArea } = useAreas();
  const [exportOption, setExportOption] = useState<string | null>("pdf");

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
            <Group spacing={8}>
              <UnstyledButton onClick={() => handleEditArea(row.original)}>
                <Edit />
              </UnstyledButton>
              <UnstyledButton
                onClick={() =>
                  openConfirmModal({
                    title: "Delete your Area ",
                    centered: true,
                    children: (
                      <Text size="sm">
                        Are you sure you want to delete your ?
                      </Text>
                    ),
                    labels: {
                      confirm: "Delete Transaction",
                      cancel: "No don't delete it",
                    },
                    confirmProps: { color: "red" },
                    onCancel: () => console.log("Cancel"),
                    onConfirm: () => handleAreaDelete(row.original._id),
                  })
                }
              >
                <Trash color="red" />
              </UnstyledButton>
            </Group>
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

  const handleAllPrint = (data: FetchAreaData[]) => {
    openExportPDF({
      items: data,
      title: "Areas-Data",
      includeFields: ["areaName", "name", "city"],
    });
  };

  const handleJSONToCSV = (data: FetchAreaData) => {
    openExportCSV({
      items: data,
      filename: "Transaction-Data",
      excludeFields: ["_id", "__v"],
    });
  };

  const handleExport = () => {
    if (exportOption === "pdf") {
      handleAllPrint(getAreas.data ? getAreas.data : []);
    }

    if (exportOption === "csv") {
      handleJSONToCSV(getAreas.data ? getAreas.data : []);
    }
  };

  const tabletoolbarRightContent = (
    <Group>
      <Button onClick={handleOpenModal} leftIcon={<Plus />} variant="outline">
        Area
      </Button>
      <Select
        data={[
          { value: "pdf", label: "PDF" },
          { value: "csv", label: "CSV" },
        ]}
        value={exportOption}
        placeholder="Export"
        sx={{ maxWidth: "100px" }}
        onChange={setExportOption}
      />
      <ActionIcon variant="outline" size="lg" onClick={handleExport}>
        <FileExport />
      </ActionIcon>
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
