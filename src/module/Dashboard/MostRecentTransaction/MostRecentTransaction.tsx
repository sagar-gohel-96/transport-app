import { Group, Text, UnstyledButton } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Edit, Plus, Trash } from "tabler-icons-react";
import { Table } from "../../../components/common";
import { useCompanies, useParties, useTransaction } from "../../../hooks";
import { RoutesMapping } from "../../../Routes";
import { FetchTransaction } from "../../../types";
import { format } from "../../../utils";
import { Formatter } from "../../../utils/formatter";
import { TransactionChallan } from "../../TransactionList";

export const MostRecentTransaction = () => {
  const navigate = useNavigate();
  const { getCompanies } = useCompanies("");
  const { getParties } = useParties("");
  const { getTransactions, deleteTransaction } = useTransaction("");

  const { data } = getTransactions;

  const getMostRecentRecord = useMemo(
    () => data && data.slice(Math.max(data.length - 5, 0)).reverse(),
    [data]
  );

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
        cell: (info) => moment.unix(info.getValue() as number).format(format),
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
        cell: (info) =>
          Formatter.formatCurrency(
            parseInt(info.getValue() as string, 10),
            "INR",
            2
          ),
        footer: (props) => props.column.id,
      },
      {
        header: "Action",
        cell: ({ row }) => (
          <div>
            <Group spacing={8}>
              <UnstyledButton>
                <PDFDownloadLink
                  document={
                    <TransactionChallan
                      parties={getParties.data ?? []}
                      companies={getCompanies.data ?? []}
                      data={row.original ?? []}
                    />
                  }
                  fileName="Transaction-Challan.pdf"
                  style={{
                    textDecoration: "none",
                    color: "gray",
                  }}
                >
                  <Download />
                </PDFDownloadLink>
              </UnstyledButton>
              <UnstyledButton
                onClick={() =>
                  navigate(
                    `/${RoutesMapping.TransactionList}/${row.original._id}`
                  )
                }
              >
                <Plus />
              </UnstyledButton>
              <UnstyledButton
                onClick={() =>
                  navigate(
                    `/${RoutesMapping.TransactionList}/${row.original._id}`
                  )
                }
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
    [getCompanies.data, getParties.data, handleTransactionDelete, navigate]
  );
  return (
    <Table
      columns={columns}
      data={getMostRecentRecord ? getMostRecentRecord : []}
      pagination
      toolbarProps={{
        title: "Most Recent Transaction",
      }}
      isLoading={getTransactions.isLoading}
      LoadingType="relative"
    />
  );
};
