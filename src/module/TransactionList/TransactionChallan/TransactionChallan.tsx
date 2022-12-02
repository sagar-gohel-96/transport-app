import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import { useMemo } from "react";
import { Square, SquareCheck } from "tabler-icons-react";

import {
  FetchCompanyData,
  FetchPartiesData,
  FetchTransaction,
  TransactionItem,
} from "../../../types";
import { format } from "../../../utils";
import { Styles } from "./components/Styles";

interface TransactionChallanProps {
  data: FetchTransaction;
  companies: FetchCompanyData[];
  parties: FetchPartiesData[];
}

export const TransactionChallan = ({
  data,
  companies,
  parties,
}: TransactionChallanProps) => {
  const {
    transactions,
    partyName,
    invoiceNo,
    invoiceDate,
    totalAmount,
    GSTAmount,
    netAmount,
    comments,
  } = data;

  const TableHeader = [
    "C. G. No.",
    "Date",
    "From",
    "To",
    "No of Arts",
    "Freint",
    "Humali",
    "Amount",
  ];

  const transaformTransactionData: TransactionItem[] = transactions.map(
    (transaction) => {
      const {
        _id,
        date,
        CGNo,
        amount,
        freight,
        fromPlace,
        hamali,
        noOfArts,
        toPlace,
      } = transaction;

      return {
        CGNo,
        date: moment.unix(transaction.date).format(format),
        fromPlace,
        toPlace,
        noOfArts,
        freight,
        hamali,
        amount,
      };
    }
  );

  const filterPartyData = useMemo(
    () => parties.filter((val) => val.name === partyName),
    [parties, partyName]
  );

  const partyData = filterPartyData[0] ?? {};
  const companyData = companies.length > 0 ? companies[0] : null;

  return (
    <Document>
      <Page size="A4" style={Styles.page} orientation="portrait">
        <View style={Styles.section}>
          <View style={Styles.headerSection}>
            <View style={Styles.logoSection}>
              <Image
                cache={false}
                src={companyData?.logoImage}
                style={{ borderRadius: "30px" }}
              />
            </View>
            <View style={Styles.headerImageSection}>
              <Image src={companyData?.headerImage} />
            </View>
          </View>
        </View>
        <View style={Styles.section}>
          <View style={Styles.transactionSection}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={Styles.partyInfoSection}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ fontWeight: "extrabold" }}>To, </Text>
                    <Text>{partyName}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "8px",
                    }}
                  >
                    <Text>Address, </Text>
                    <Text>{partyData.address}</Text>
                  </View>
                </View>
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text>GST No.: </Text>
                    <Text>{partyData.GSTIN}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "8px",
                    }}
                  >
                    <Text>Place of service: </Text>
                    <Text>Gujarat</Text>
                  </View>
                </View>
              </View>
              <View style={Styles.invoiceInfoSection}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text>Invoice No: </Text>
                  <Text>{invoiceNo}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "8px",
                  }}
                >
                  <Text>Invoice Date: </Text>
                  <Text>{moment.unix(invoiceDate).format(format)}</Text>
                </View>
              </View>
            </View>

            <View style={Styles.tableHeader}>
              {TableHeader.map((col, i) => (
                <View style={Styles.tableShell} key={i}>
                  <Text>{col}</Text>
                </View>
              ))}
            </View>
            {transaformTransactionData.map((item, i) => (
              <View style={Styles.tableRow} key={i}>
                <View style={Styles.tableColumn}>
                  {Object.values(item).map((val, i) => (
                    <View style={Styles.tableShell} key={i}>
                      <Text>{val}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            <View></View>
          </View>
        </View>
        <View style={Styles.section}>
          <View style={Styles.billingSection}>
            <View style={Styles.remarkSection}>
              <View style={Styles.remarkItem}>
                <Text>
                  Whether tax is payable under Reserve Charges Basis[RCM]:
                </Text>
                <Text> NO</Text>
              </View>
              <View style={Styles.remarkItem}>
                <Text>Remark: </Text>
                <Text>{comments}</Text>
              </View>

              <View style={Styles.remarkItem}>
                <Text>Rs, </Text>
                <Text style={{ textTransform: "uppercase" }}>
                  Ruppes Thousand /five Hundred Only
                </Text>
              </View>
            </View>
            <View style={Styles.pricingSection}>
              <View style={Styles.pricingItem}>
                <Text>Total Amount : </Text>
                <Text>{totalAmount}</Text>
              </View>
              <View style={Styles.pricingItem}>
                <Text>GST Amount : </Text>
                <Text>{GSTAmount}</Text>
              </View>
              <View style={Styles.pricingItem}>
                <Text>Net Amount : </Text>
                <Text>{netAmount}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={Styles.section}>
          <View style={Styles.companyBillingSection}>
            <View>
              <View style={Styles.companyBillingInfoItem}>
                <Text>GST No.: </Text>
                <Text>{companyData?.GSTIN}</Text>
              </View>
              <View style={Styles.companyBillingInfoItem}>
                <Text>PAN No.: </Text>
                <Text>{companyData?.PAN}</Text>
              </View>
              <View style={Styles.companyBillingInfoItem}>
                <Text>HSN/SAC No.:</Text>
                <Text>99679</Text>
              </View>
            </View>
            <View>
              <View style={Styles.taxOptionLable}>
                <Text style={{ textTransform: "uppercase" }}>
                  tax Payable bye
                </Text>
              </View>
              <View style={Styles.taxOption}>
                <View>
                  <Text style={Styles.taxOptionItemLable}>Consignor</Text>
                </View>
                <View>
                  <View>
                    <SquareCheck />
                  </View>
                  <Text style={Styles.taxOptionItemLable}>Consignee</Text>
                </View>
                <View>
                  <View>
                    <Square />
                  </View>
                  <Text style={Styles.taxOptionItemLable}>Transaportor</Text>
                </View>
              </View>
            </View>
            <View style={Styles.comapnySign}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text>For, </Text>
                <Text>{companyData?.companyName}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
