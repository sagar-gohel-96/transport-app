import {
  ActionIcon,
  Button,
  Group,
  // Select,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Edit,
  FileSpreadsheet,
  Plus,
  Trash,
} from "tabler-icons-react";
import { PdfIcon } from "../../assets/icons/PdfIcon";
import { Table } from "../../components/common";
import { useCompanies, useParties, useTransaction } from "../../hooks";
import { RoutesMapping } from "../../Routes";
import { FetchTransaction } from "../../types";
import { format, openExportCSV, openExportPDF } from "../../utils";
import { TransactionChallan } from "./TransactionChallan";

export const TransactionList = () => {
  const { getTransactions, deleteTransaction } = useTransaction("");
  const { getCompanies } = useCompanies("");
  const { getParties } = useParties("");
  const navigate = useNavigate();
  // const [exportOption, setExportOption] = useState<string | null>("pdf");
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
        ),
      },
    ],
    [getCompanies.data, getParties.data, handleTransactionDelete, navigate]
  );

  const handleAllPrint = (data: FetchTransaction[]) => {
    openExportPDF({
      items: data,
      title: "Transactions-Data",
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

  const handleJSONToCSV = (data: FetchTransaction) => {
    openExportCSV({
      items: data,
      filename: "Transaction-Data",
      excludeFields: ["_id", "__v", "transactions"],
    });
  };

  // const handleExport = () => {
  //   if (exportOption === "pdf") {
  //     handleAllPrint(getTransactions.data ? getTransactions.data : []);
  //   }

  //   if (exportOption === "csv") {
  //     handleJSONToCSV(getTransactions.data ? getTransactions.data : []);
  //   }
  // };

  const tabletoolbarRightContent = (
    <Group>
      <Button
        onClick={() => navigate(`/${RoutesMapping.Transaction}/${id}`)}
        leftIcon={<Plus />}
        variant="outline"
      >
        Transaction
      </Button>
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
        onClick={() =>
          handleAllPrint(getTransactions.data ? getTransactions.data : [])
        }
      >
        <PdfIcon height={20} stroke="2" />
      </ActionIcon>
      <ActionIcon
        variant="outline"
        size="lg"
        onClick={() =>
          handleJSONToCSV(getTransactions.data ? getTransactions.data : [])
        }
      >
        <FileSpreadsheet />
      </ActionIcon>
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
