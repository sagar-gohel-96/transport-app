export interface TransactionItem {
  _id?: string;
  fromPlace: string;
  toPlace: string;
  noOfArts: number;
  freint: number;
  humali: number;
  amount: number;
}

export interface TransactionData {
  _id?: string;
  invoiceDate: Date;
  partyName: string;
  totalAmount: number;
  GSTAmount: number;
  netAmount: number;
  comments: string;
  transactions: TransactionItem[];
}

export interface TransactionPayload {
  _id?: string;
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
  invoiceNo: number;
  invoiceDate: number;
  partyName: string;
  totalAmount: number;
  GSTAmount: number;
  netAmount: number;
  comments: string;
  createdAt: Date;
  updatedAt: Date;
  transactions: TransactionItem[];
}
