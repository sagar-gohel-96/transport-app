export interface AddPartyData {
  _id?: string;
  partyCode: string;
  name: string;
  category: string;
  address: string;
  city: string;
  pincode: number;
  district: string;
  state: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  GSTIN: string;
  PAN: string;
  creditLimit: number;
  creditPeriod: number;
  creditInvoice: number;
}

export interface FetchPartiesData {
  _id: string;
  partyCode: string;
  name: string;
  category: string;
  address: string;
  city: string;
  pincode: number;
  district: string;
  state: string;
  contactPerson: string;
  phoneNumber: "";
  email: string;
  GSTIN: string;
  PAN: string;
  creditLimit: number;
  creditPeriod: number;
  creditInvoice: number;
}

export interface Responce {
  data: {
    massege: string;
    statusCode: number;
  };
}
