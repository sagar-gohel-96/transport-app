import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Dots, Edit, Plus, Printer, Trash } from "tabler-icons-react";
import { Table } from "../../components/common";
import { useTransaction } from "../../hooks";
import { FetchTransaction } from "../../types";

export const TransactionList = () => {
  const { getTransactions, deleteTransaction } = useTransaction("");
  const navigate = useNavigate();
  const id = "00000000000000000000000";

  useEffect(() => {
    getTransactions.refetch();
  }, [getTransactions]);

  const handleTransactionDelete = useCallback(
    async (id: string) => {
      const response: any = await deleteTransaction(id);
      if (response.data.success) {
        getTransactions.refetch();
        showNotification({
          title: "Transaction",
          message: response.data.message,
        });
      } else {
        showNotification({
          title: "Transaction",
          message: response.data.message,
        });
      }
    },
    [deleteTransaction, getTransactions]
  );

  const columns = useMemo<ColumnDef<FetchTransaction>[]>(
    () => [
      {
        header: "#",
        cell: (info) => parseInt(info.row.id) + 1,
        footer: (props) => props.column.id,
      },
      {
        header: "Invoice No",
        accessorKey: "invoiceNo",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Invoice Date",
        accessorKey: "invoiceDate",
        cell: (info) => moment.unix(info.getValue() as number).format("LL"),
        footer: (props) => props.column.id,
      },
      {
        header: "Party Name",
        accessorKey: "partyName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Net Amount",
        accessorKey: "netAmount",
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
            {/* <Menu withinPortal position="bottom-end" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <Dots size={16} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  icon={<Edit size={20} strokeWidth={1.5} />}
                  onClick={() => navigate(`/transaction/${row.original._id}`)}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  icon={<Trash size={20} strokeWidth={1.5} />}
                  color="red"
                  onClick={() =>
                    openConfirmModal({
                      title: "Delete your Tranaction ",
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
                      onConfirm: () =>
                        handleTransactionDelete(row.original._id),
                    })
                  }
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu> */}
            <Group spacing={8}>
              <UnstyledButton>
                <Printer />
              </UnstyledButton>
              <UnstyledButton
                onClick={() => navigate(`/transaction/${row.original._id}`)}
              >
                <Edit />
              </UnstyledButton>
              <UnstyledButton
                onClick={() =>
                  openConfirmModal({
                    title: "Delete your Tranaction ",
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
                    onConfirm: () => handleTransactionDelete(row.original._id),
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
    [handleTransactionDelete, navigate]
  );

  const tabletoolbarRightContent = (
    <Group>
      <Button
        onClick={() => navigate(`/transaction/${id}`)}
        leftIcon={<Plus />}
        variant="outline"
      >
        Transaction
      </Button>
    </Group>
  );

  return (
    <Table
      columns={columns}
      data={getTransactions.data ? getTransactions.data : []}
      pagination
      toolbarProps={{
        title: "Transaction Details",
        showSearch: true,
        rightContent: tabletoolbarRightContent,
      }}
      isLoading={getTransactions.isLoading}
      LoadingType="relative"
    />
  );
};
