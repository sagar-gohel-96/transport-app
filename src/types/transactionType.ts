export interface TransactionItem {
  _id?: string;
  CGNo: number;
  date: Date | string;
  fromPlace: string;
  toPlace: string;
  noOfArts: number;
  freight: number;
  hamali: number;
  amount: number;
}

type Transaction = Omit<TransactionItem, 'date'>;

export interface TransactionItemPayload extends Transaction {
  date: number;
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
  companyId: string;
}

export interface TransactionPayload {
  _id?: string;
  invoiceDate: number;
  partyName: string;
  totalAmount: number;
  GSTAmount: number;
  netAmount: number;
  comments: string;
  transactions: TransactionItemPayload[];
  companyId: string;
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
  transactions: TransactionItemPayload[];
  companyId: string;
}
