export interface TransactionItem {
  fromPlace: string;
  toPlace: string;
  noOfArts: number;
  freint: number;
  humali: number;
  amount: number;
}

export interface TransactionData {
  invoiceDate: Date;
  partyName: string;
  totalAmount: number;
  GSTAmount: number;
  netAmount: number;
  comments: string;
  transactions: TransactionItem[];
}

export interface TransactionPayload {
  _id: string;
  invoiceDate: number;
  partyName: string;
  totalAmount: number;
  GSTAmount: number;
  netAmount: number;
  comments: string;
  transactions: TransactionItem[];
}

export interface FetchTransaction {
  _id: string;
  invoiceDate: number;
  partyName: string;
  totalAmount: number;
  GSTAmount: number;
  netAmount: number;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
}
