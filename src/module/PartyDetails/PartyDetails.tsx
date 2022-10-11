import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
// import axios from "axios";
import { Table } from "../../components/common";
import { ColumnDef } from "@tanstack/react-table";
// import PartyDetails1 from "./utils/partiesData.json";
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Menu,
  Modal,
} from "@mantine/core";

import { CirclePlus, Dots, Edit, Trash } from "tabler-icons-react";
import { useGetUsersQuery } from "../../api";
import { LoadingIndicator } from "../../components/common/LoadingIndicator";
import { AddPartiesForm, EditPartiesForm } from "./components";
import { Routes } from "../../components/layout";
import { PartiesData } from "./utils/partiesData1";
import { AddPartyData } from "../../types";


export const PartyDetails = () => {
  const [userData, setUserData] = useState<AddPartyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalData,setModalData] = useState<AddPartyData>()
  const [opened, setOpened] = useState(false);

  const { data, error, isLoading } = useGetUsersQuery("");


  const fetchData = useCallback(async () => {
    try {
      // const response = await axios.get(
      //   "https://jsonplaceholder.typicode.com/todos"
      // );
      // return response.data;
      return PartiesData
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // const data = await fetchData();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUserData(PartiesData);
      setLoading(false);
    })();
  }, [fetchData]);

  const handleModalClose = () => {
    setOpened(false);
    
  };

  const handleOpenModal = () => {
    setOpened(true);
  };

  const handleEditPartty = (data:AddPartyData) =>{
    setModalData(data)
    setOpened(true)
  }
  // console.log('party',PartiesData)

  const columns = useMemo<ColumnDef<AddPartyData>[]>(
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
        header: "Code",
        accessorKey: "partyCode",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header:"Parties Name",
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
        cell: ({ row, getValue }) => (
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
                <Menu.Item icon={<Edit size={20} strokeWidth={1.5} />} onClick={() => handleEditPartty(row.original)}>
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
      {false && <LoadingIndicator isLoading loadingType="overlay" />}
      <Table
        columns={columns}
        data={userData}
        pagination
        toolbarProps={{
          title: "Party Details",
          rightContent: tabletoolbarRightContent,
          showSearch: true,
        }}
        isLoading={loading}
        LoadingType="relative"
      />
      <Modal opened={opened} onClose={handleModalClose} size="xl">
        {/* <AddPartiesForm handleCloseModal={handleModalClose} /> */}
        <EditPartiesForm handleCloseModal={handleModalClose} data={modalData ?? null}/>
      </Modal>
    </Fragment>
  );
};
