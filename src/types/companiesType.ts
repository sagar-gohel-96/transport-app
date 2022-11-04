export interface AddCompanyData {
  _id?: string;
  companyCode: string;
  companyName: string;
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
  logoImage: string;
  headerImage: string;
  creditLimit: number;
  creditPeriod: number;
  creditInvoice: number;
}

export interface FetchCompanyData {
  _id: string;
  companyCode: string;
  companyName: string;
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
  logoImage: string;
  headerImage: string;
  creditLimit: number;
  creditPeriod: number;
  creditInvoice: number;
}
