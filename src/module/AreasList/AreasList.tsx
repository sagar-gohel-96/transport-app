import {
  ActionIcon,
  Button,
  // Checkbox,
  Group,
  // Select,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, FileSpreadsheet, Plus, Trash } from "tabler-icons-react";
import { PdfIcon } from "../../assets/icons";
import { Table } from "../../components/common";
import { useAreas } from "../../hooks";
import { RoutesMapping } from "../../Routes";
import { FetchAreaData } from "../../types";
import { openExportCSV, openExportPDF } from "../../utils";

export const AreasList = () => {
  const navgate = useNavigate();
  const { getAreas, deleteArea } = useAreas("");
  // const [exportOption, setExportOption] = useState<string | null>("pdf");

  useEffect(() => {
    getAreas.refetch();
  }, [getAreas]);

  const id = "00000000000000000000000";

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
              <UnstyledButton
                onClick={() =>
                  navgate(`/${RoutesMapping.AreasList}/${row.original._id}`)
                }
              >
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
    [handleAreaDelete, navgate]
  );

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

  const tabletoolbarRightContent = (
    <Group>
      <Button
        onClick={() => navgate(`/${RoutesMapping.AreasList}/${id}`)}
        leftIcon={<Plus />}
        variant="outline"
      >
        Area
      </Button>

      <ActionIcon
        variant="outline"
        size="lg"
        onClick={() => handleAllPrint(getAreas.data ? getAreas.data : [])}
      >
        <PdfIcon height={20} stroke="2" />
      </ActionIcon>
      <ActionIcon
        variant="outline"
        size="lg"
        onClick={() => handleJSONToCSV(getAreas.data ? getAreas.data : [])}
      >
        <FileSpreadsheet />
      </ActionIcon>
    </Group>
  );

  return (
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
  );
};
