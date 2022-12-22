import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import moment from 'moment';
import { useMemo } from 'react';
import { Square, SquareCheck } from 'tabler-icons-react';

import {
  FetchCompanyData,
  FetchPartiesData,
  FetchTransaction,
  TransactionItem,
} from '../../../types';
import { format } from '../../../utils';
import { Formatter } from '../../../utils/formatter';
import { Styles } from './components/Styles';

interface TransactionChallanProps {
  data: FetchTransaction;
  companies: FetchCompanyData;
  parties: FetchPartiesData[];
  withHeader?: boolean;
}

export const TransactionChallan = ({
  data,
  companies,
  parties,
  withHeader,
}: TransactionChallanProps) => {
  const {
    transactions,
    partyId,
    invoiceNo,
    invoiceDate,
    totalAmount,
    GSTAmount,
    netAmount,
    comments,
  } = data;

  const TableHeader = [
    'C. G. No.',
    'Date',
    'From',
    'To',
    'No of Arts',
    'Freight',
    'Hamali',
    'Amount',
  ];

  const transaformTransactionData: TransactionItem[] = transactions.map(
    (transaction) => {
      const {
        // _id,
        // date,
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
    () => parties && parties.filter((val) => val._id === partyId),
    [parties, partyId]
  );

  const partyData = filterPartyData[0] ?? {};

  return (
    <Document>
      <Page size="A4" style={Styles.page} orientation="portrait">
        <View style={Styles.section}>
          {withHeader && (
            <View style={Styles.headerSection}>
              <View style={Styles.logoSection}>
                {companies?.logoImage && (
                  <Image
                    cache={false}
                    src={companies?.logoImage}
                    style={{ borderRadius: '30px' }}
                  />
                )}
              </View>
              <View style={Styles.headerImageSection}>
                {companies?.headerImage && (
                  <Image src={companies?.headerImage} />
                )}
              </View>
            </View>
          )}
          {!withHeader && <View style={{ marginTop: '72px' }}></View>}
        </View>
        <View style={Styles.section}>
          <View style={Styles.transactionSection}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <View style={Styles.partyInfoSection}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>To, </Text>
                    <Text>{partyData.name}</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: '8px',
                    }}
                  >
                    <Text>Address, </Text>
                    <Text>{partyData.address}</Text>
                  </View>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 800 }}>GST No.: </Text>
                    <Text>{partyData.GSTIN}</Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: '8px',
                    }}
                  >
                    <Text>Place of service: </Text>
                    <Text>Gujarat</Text>
                  </View>
                </View>
              </View>
              <View style={Styles.invoiceInfoSection}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text>Invoice No: </Text>
                  <Text>{invoiceNo}</Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '8px',
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>Invoice Date: </Text>
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
                <Text style={{ textTransform: 'uppercase' }}>
                  {Formatter.formatNumberToWord(totalAmount)}
                </Text>
              </View>
            </View>
            <View style={Styles.pricingSection}>
              <View style={Styles.pricingItem}>
                <Text>Total Amount : </Text>
                <Text>{totalAmount}</Text>
              </View>
              {/* <View style={Styles.pricingItem}>
                <Text>GST Amount : </Text>
                <Text>{GSTAmount}</Text>
              </View> */}
              {/* <View style={Styles.pricingItem}>
                <Text>Net Amount : </Text>
                <Text>{netAmount}</Text>
              </View> */}
            </View>
          </View>
        </View>
        <View style={Styles.section}>
          <View style={Styles.companyBillingSection}>
            <View>
              <View style={Styles.companyBillingInfoItem}>
                <Text>GST No.: </Text>
                <Text>{companies?.GSTIN}</Text>
              </View>
              <View style={Styles.companyBillingInfoItem}>
                <Text>PAN No.: </Text>
                <Text>{companies?.PAN}</Text>
              </View>
              <View style={Styles.companyBillingInfoItem}>
                <Text>HSN/SAC No.:</Text>
                <Text>99679</Text>
              </View>
            </View>
            <View>
              <View style={Styles.taxOptionLable}>
                <Text style={{ textTransform: 'uppercase' }}>
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
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Text>For, </Text>
                <Text>{companies?.companyName}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
