export interface AddUserPayload {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
  address: string;
  city: string;
  state: string;
  phone: string;
}

export interface UserResponse {
  email: string;
  name: string;
  phone: string;
  role: number;
  birthDate: string;
  address: string;
  city: string;
  state: string;
  _id: string;
}
