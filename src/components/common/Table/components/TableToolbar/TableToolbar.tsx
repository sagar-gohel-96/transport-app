import {
  Box,
  Divider,
  Group,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Fragment, memo, useContext } from "react";
import { Download } from "tabler-icons-react";
import { useCompanies, useParties } from "../../../../../hooks";
import { TransactionChallan } from "../../../../../module";
import { FetchTransaction } from "../../../../../types";
import { TableContext } from "../../context/TableContext";
import { TableToolbarProps } from "../../Table";

export const TableToolbar: React.FC<TableToolbarProps> = memo((props) => {
  const { title, leftContent, rightContent, showSearch } = props;
  const { value, setValue, selectedValues } = useContext(TableContext);
  const { getCompanies } = useCompanies("");
  const { getParties } = useParties("");

  return (
    <Box>
      {!!title && (
        <Fragment>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            px="sm"
          >
            <Group>
              <Text weight={600} py="md">
                {title}
              </Text>
              {leftContent}
            </Group>
            <Group>
              {rightContent}
              {selectedValues.length && (
                <UnstyledButton>
                  <PDFDownloadLink
                    document={selectedValues.map(
                      (transaction: FetchTransaction, index: number) => (
                        <TransactionChallan
                          key={index}
                          parties={getParties.data ?? []}
                          companies={getCompanies.data ?? []}
                          data={transaction ?? []}
                          withHeader
                        />
                      )
                    )}
                    fileName="Transaction-Challan.pdf"
                    style={{
                      textDecoration: "none",
                      color: "gray",
                    }}
                  >
                    <Download />
                  </PDFDownloadLink>
                </UnstyledButton>
              )}
              {showSearch && (
                <Box>
                  <TextInput
                    defaultValue={value}
                    placeholder="Search..."
                    style={{ flex: 1 }}
                    onChange={(event) => setValue(event.currentTarget.value)}
                  />
                </Box>
              )}
            </Group>
          </Box>
          <Divider />
        </Fragment>
      )}
    </Box>
  );
});
