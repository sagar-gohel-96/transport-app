import { ActionIcon, Button, Group, Menu, Modal, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import { Fragment, useCallback, useMemo, useState } from "react";
import { Dots, Edit, Plus, Trash } from "tabler-icons-react";
import { Table } from "../../components/common";
import { useCompanies } from "../../hooks";
import { FetchCompanyData } from "../../types";
import { AddCompany } from "./components/AddCompany";

export const CompaniesList = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [companyRecord, setCompanyRecord] = useState<FetchCompanyData>();
  const { getCompanies, addCompany, deletecompany, updateCompany } =
    useCompanies();

  const handleEditPartty = (data: FetchCompanyData) => {
    setCompanyRecord(data);
    setOpened(true);
  };

  const handleCompanyDelete = useCallback(
    async (id: string) => {
      const response: any = await deletecompany(id);
      if (response.data.success) {
        getCompanies.refetch();
        showNotification({
          title: "Company",
          message: response.data.message,
        });
      } else {
        showNotification({
          title: "Company",
          message: response.data.message,
        });
      }
    },
    [deletecompany, getCompanies]
  );

  const columns = useMemo<ColumnDef<FetchCompanyData>[]>(
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

        cell: (info) => parseInt(info.row.id) + 1,
        footer: (props) => props.column.id,
      },
      {
        header: "Company Name",
        accessorKey: "companyName",
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
                  Edit Company
                </Menu.Item>
                <Menu.Item
                  icon={<Trash size={20} strokeWidth={1.5} />}
                  color="red"
                  onClick={() =>
                    openConfirmModal({
                      title: "Delete your Company",
                      centered: true,
                      children: (
                        <Text size="sm">
                          Are you sure you want to delete your Company?
                        </Text>
                      ),
                      labels: {
                        confirm: "Delete Company",
                        cancel: "No don't delete it",
                      },
                      confirmProps: { color: "red" },
                      onCancel: () => console.log("Cancel"),
                      onConfirm: () => handleCompanyDelete(row.original._id),
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
    [handleCompanyDelete]
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
        Company
      </Button>
    </Group>
  );

  return (
    <Fragment>
      <Table
        columns={columns}
        data={getCompanies.data ? getCompanies.data : []}
        pagination
        toolbarProps={{
          title: "Company Details",
          showSearch: true,
          rightContent: tabletoolbarRightContent,
        }}
        isLoading={getCompanies.isLoading}
        LoadingType="relative"
      />
      <Modal opened={opened} onClose={handleModalClose} size="xl">
        <AddCompany
          handleCloseModal={handleModalClose}
          data={companyRecord}
          addCompany={addCompany}
          updateCompany={updateCompany}
          refetch={getCompanies.refetch}
        />
      </Modal>
    </Fragment>
  );
};
