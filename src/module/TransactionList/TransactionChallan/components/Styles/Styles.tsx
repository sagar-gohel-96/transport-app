import { StyleSheet } from "@react-pdf/renderer";

export const Styles = StyleSheet.create({
  page: {
    // backgroundColor: "#d11fb6",
    fontSize: "10px",
    color: "black",
  },
  section: {
    paddingVertical: "8px",
    paddingHorizontal: "16px",
  },

  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },

  headerSection: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid black",
    paddingHorizontal: "8px",
    paddingVertical: "8px",
    marginTop: "8px",
    alignItems: "center",
  },

  logoSection: {
    height: "60px",
    width: "60px",
    // border: "1px",
  },

  headerImageSection: {
    marginLeft: "8px",
    height: "60px",
    display: "flex",
    flex: "1",
  },

  transactionSection: {
    borderTop: "1px solid black",
    borderRight: "1px solid black",
  },

  partyInfoSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: "1",
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    paddingHorizontal: "8px",
    paddingVertical: "8px",
  },

  invoiceInfoSection: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: "8px",
    paddingVertical: "8px",
  },

  tableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    // paddingHorizontal: "8px",
    // paddingVertical: "8px",
    textTransform: "capitalize",
  },

  tableShell: {
    display: "flex",
    flex: 1,
    borderLeft: "1px solid black",
    paddingHorizontal: "8px",
    paddingVertical: "8px",
  },

  tableRow: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid black",
    // paddingHorizontal: "8px",
    // paddingVertical: "8px",
  },

  tableColumn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  billingSection: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid black",
    // paddingHorizontal: "8px",
    paddingVertical: "4px",
  },

  remarkSection: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    // alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  remarkItem: {
    display: "flex",
    flexDirection: "row",
    marginTop: "4px",
  },

  pricingSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  pricingItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "4px",
  },

  companyBillingSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  companyBillingInfoItem: {
    display: "flex",
    flexDirection: "row",
    marginTop: "4px",
  },

  taxOptionLable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  taxOption: {
    display: "flex",
    flexDirection: "row",
    marginTop: "4px",
  },

  taxOptionItemLable: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "4px",
  },

  comapnySign: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});
