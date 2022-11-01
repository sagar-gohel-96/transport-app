import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Menu,
  Modal,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { CirclePlus, Dots, Edit, Trash } from "tabler-icons-react";
import {
  useAddPartyMutation,
  useDeletePartyMutation,
  useGetPartiesQuery,
  useUpdatePartyMutation,
} from "../../api/parties";
import { Table } from "../../components/common";
import { FetchPartiesData } from "../../types";
import { AddPartiesForm } from "./components";

export const PartiesDetails = () => {
  const [PartiesData, setPartiesData] = useState<FetchPartiesData[]>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [partyRecord, setPartyRecord] = useState<FetchPartiesData>();
  // const [loading, setLoading] = useState(false);

  const { data, isLoading, refetch } = useGetPartiesQuery("");
  const [addParty] = useAddPartyMutation();
  const [updateParty] = useUpdatePartyMutation();
  const [deleteParty] = useDeletePartyMutation();

  useEffect(() => {
    (async () => {
      try {
        const fetchData = await data.data;
        setPartiesData(fetchData ? fetchData : []);
      } catch (err) {
        console.log("Error");
      }
    })();
  }, [data]);

  const handleEditPartty = (data: FetchPartiesData) => {
    console.log("Fetch By Id", data);
    setPartyRecord(data);
    setOpened(true);
  };

  const handledeleteParty = useCallback(
    async (id: string) => {
      const response: any = await deleteParty(id);
      console.log("responce", response);
      if (response.data.success) {
        refetch();
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
    [deleteParty, refetch]
  );

  const columns = useMemo<ColumnDef<FetchPartiesData>[]>(
    () => [
      {
        id: "select",
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
                <Menu.Item icon={<CirclePlus size={20} strokeWidth={1.5} />}>
                  Add Party
                </Menu.Item>
                <Menu.Item
                  icon={<Edit size={20} strokeWidth={1.5} />}
                  onClick={() => handleEditPartty(row.original)}
                >
                  Edit Party
                </Menu.Item>
                <Menu.Item
                  icon={<Trash size={20} strokeWidth={1.5} />}
                  color="red"
                  onClick={() => handledeleteParty(row.original._id)}
                >
                  Delete all
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        ),
      },
    ],
    [handledeleteParty]
  );

  const handleModalClose = () => {
    console.log("is close");
    setOpened(false);
  };

  const handleOpenModal = () => {
    console.log("is opend");
    setOpened(true);
  };

  const tabletoolbarRightContent = (
    <Group>
      <Button onClick={handleOpenModal}>Add Party</Button>
    </Group>
  );

  return (
    <Fragment>
      <Table
        columns={columns}
        data={PartiesData}
        pagination
        toolbarProps={{
          title: "Party Details",
          showSearch: true,
          rightContent: tabletoolbarRightContent,
        }}
        isLoading={isLoading}
        LoadingType="relative"
      />
      <Modal opened={opened} onClose={handleModalClose} size="xl">
        <AddPartiesForm
          handleCloseModal={handleModalClose}
          data={partyRecord}
          addParty={addParty}
          updateParty={updateParty}
          refetch={refetch}
        />
      </Modal>
    </Fragment>
  );
};
