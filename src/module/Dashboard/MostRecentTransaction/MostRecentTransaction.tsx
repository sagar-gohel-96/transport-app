import { Group, UnstyledButton } from "@mantine/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useMemo } from "react";
import { Download } from "tabler-icons-react";
import { Table } from "../../../components/common";
import { useCompanies, useParties, useTransaction } from "../../../hooks";
import { FetchTransaction } from "../../../types";
import { format } from "../../../utils";
import { Formatter } from "../../../utils/formatter";
import { TransactionChallan } from "../../TransactionList";

export const MostRecentTransaction = () => {
  const { getCompanies } = useCompanies("");
  const { getParties } = useParties("");
  const { getTransactions } = useTransaction("");

  const { data } = getTransactions;

  const getMostRecentRecord = useMemo(
    () => data && data.slice(Math.max(data.length - 5, 0)).reverse(),
    [data]
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
                    padding: "10px",
                    color: "#4a4a4a",
                  }}
                >
                  <Download />
                </PDFDownloadLink>
              </UnstyledButton>
            </Group>
          </div>
        ),
      },
    ],
    [getCompanies.data, getParties.data]
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
