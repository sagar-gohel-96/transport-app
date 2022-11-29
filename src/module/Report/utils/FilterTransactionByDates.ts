import moment, { Moment } from "moment";

export const FilterTransactionByDates = (
  fromdate: Moment | undefined,
  toDate: Moment | undefined,
  transactionsData: any
) => {
  const filteredDataArray: any = [];

  transactionsData.forEach((transaction: any) => {
    const tranDate = moment.unix(transaction.invoiceDate).format("L");

    if (fromdate && !toDate) {
      const dateAfter = moment(tranDate).isSameOrAfter(fromdate);

      if (dateAfter) {
        filteredDataArray.push(transaction);
      }
    }

    if (toDate && !fromdate) {
      const dateBefore = moment(tranDate).isSameOrBefore(toDate);

      if (dateBefore) {
        filteredDataArray.push(transaction);
      }
    }

    if (fromdate && toDate) {
      const dateIsBitween = moment(tranDate).isBetween(
        fromdate,
        toDate,
        undefined,
        "[]"
      );
      const dateIsSame = fromdate.isSame(toDate);

      if (dateIsSame) {
        if (moment(tranDate).isSame(fromdate))
          filteredDataArray.push(transaction);
      }

      if (dateIsBitween) {
        filteredDataArray.push(transaction);
      }
    }

    if (!fromdate && !toDate) {
      filteredDataArray.push(transaction);
    }
  });

  return filteredDataArray;
};
