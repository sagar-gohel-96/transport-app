import { ActionIcon, Group, Text, UnstyledButton } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Edit, FileSpreadsheet, Trash } from "tabler-icons-react";
import { PdfIcon } from "../../../assets/icons";
import { Table } from "../../../components/common";
import { useCompanies, useParties, useTransaction } from "../../../hooks";
import { FetchTransaction } from "../../../types";
import { format, openExportCSV, openExportPDF } from "../../../utils";
import { TransactionChallan } from "../../TransactionList";
import { FilterTransactionByDates } from "../utils";

export const DateWiseReportswithHeader = () => {
  const { getTransactions, deleteTransaction } = useTransaction("");
  const { getCompanies } = useCompanies("");
  const { getParties } = useParties("");
  // const [exportOption, setExportOption] = useState<string | null>("pdf");

  const toDayDate = new Date();
  const currentMonthFirstDate = new Date(
    toDayDate.getFullYear(),
    toDayDate.getMonth(),
    1
  );

  const [pickFromDate, setPickFromDate] = useState<Date | null>(
    currentMonthFirstDate
  );
  const [pickToDate, setPickToDate] = useState<Date | null>(toDayDate);

  const navigate = useNavigate();

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
        cell: (info) => info.getValue(),
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
                      parties={getParties.data}
                      companies={getCompanies.data}
                      data={row.original ?? []}
                      withHeader
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
    [getCompanies.data, getParties.data, handleTransactionDelete, navigate]
  );

  const FilteredData = FilterTransactionByDates(
    pickFromDate ? moment(pickFromDate) : undefined,
    pickToDate ? moment(pickToDate) : undefined,
    getTransactions.data ? getTransactions.data : []
  );

  const handleAllPrint = (data: FetchTransaction[]) => {
    openExportPDF({
      items: data,
      title: `Transaction-Report (${moment(pickFromDate).format(
        format
      )} - ${moment(pickToDate).format(format)} )`,
      includeFields: [
        "invoiceNo",
        "invoiceDate",
        "partyName",
        "totalAmount",
        "GSTAmount",
        "netAmount",
        "comments",
      ],
    });
  };

  const handleJSONToCSV = (data: FetchTransaction[]) => {
    openExportCSV({
      items: data,
      filename: `Transaction-Report (${moment(pickFromDate).format(
        format
      )} - ${moment(pickToDate).format(format)} )`,
      excludeFields: ["_id", "__v", "transactions"],
    });
  };
  // const handleExport = () => {
  //   if (exportOption === "pdf") {
  //     handleAllPrint(FilteredData ? FilteredData : []);
  //   }

  //   if (exportOption === "csv") {
  //     handleJSONToCSV(FilteredData ? FilteredData : []);
  //   }
  // };

  const tabletoolbarRightContent = (
    <Group>
      <DatePicker
        placeholder="From Date"
        withAsterisk
        value={pickFromDate}
        onChange={setPickFromDate}
        inputFormat={format}
      />
      <Text>To</Text>
      <DatePicker
        placeholder="To Date"
        withAsterisk
        value={pickToDate}
        onChange={setPickToDate}
        inputFormat={format}
      />
      {/* <Select
        data={[
          { value: "pdf", label: "PDF" },
          { value: "csv", label: "CSV" },
        ]}
        value={exportOption}
        placeholder="Export"
        sx={{ maxWidth: "100px" }}
        onChange={setExportOption}
      /> */}
      <ActionIcon
        variant="outline"
        size="lg"
        onClick={() => handleAllPrint(FilteredData ? FilteredData : [])}
      >
        <PdfIcon height={20} stroke="2" />
      </ActionIcon>
      <ActionIcon
        variant="outline"
        size="lg"
        onClick={() => handleJSONToCSV(FilteredData ? FilteredData : [])}
      >
        <FileSpreadsheet />
      </ActionIcon>
    </Group>
  );

  return (
    <Table
      columns={columns}
      // data={getTransactions.data ? getTransactions.data : []}
      data={FilteredData ? FilteredData : []}
      pagination
      toolbarProps={{
        title: "Date Wise Reports",
        showSearch: true,
        rightContent: tabletoolbarRightContent,
      }}
      isLoading={getTransactions.isLoading}
      LoadingType="relative"
    />
  );
};