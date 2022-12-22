import { FetchTransaction } from '../../../types';

export const FilterTransactionByParties = (
  transactionData: FetchTransaction[],
  filterParties: string[]
) => {
  if (!!!filterParties.length) return transactionData;

  const filteredData = transactionData.filter((transaction) =>
    filterParties.includes(transaction.partyId)
  );
  return filteredData;
};
