export interface AddUserPayload {
  role: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  //   address: string;
  // birthDate: string;
}

export interface UserResponse {
  email: string;
  name: string;
  phone: string;
  role: number;
  _id: string;
}
