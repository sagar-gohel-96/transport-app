import { faker } from "@faker-js/faker";
import { AddPartyData } from "../../../types";

const createUser = ():AddPartyData => {
  return {
    partyCode: faker.datatype.number({
        min: 10000,
        max: 99999,
      }).toString(),
    name: faker.name.firstName(),
    category: faker.helpers.arrayElement(["free", "basic", "business"]),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    pincode: faker.datatype.number({
      min: 100001,
      max: 999999,
    }),
    district: faker.address.cityName(),
    state: faker.address.state(),
    contactPerson: faker.name.fullName(),
    phoneNumber: faker.phone.number("+48 91 ### ## ##"),
    email: faker.internet.email(),
    GSTIN: faker.datatype.string(),
    PAN: faker.datatype.string(),
    creditLimit: faker.datatype.number({
      min: 1000,
      max: 9999,
    }),
    creditPeriod: faker.datatype.number({
      min: 5,
      max: 10,
    }),
    creditInvoice: faker.datatype.number({
      min: 100,
      max: 999,
    }),
  };
}

const createUsers = (numUsers = 5) => {
    return new Array(numUsers)
      .fill(undefined)
      .map(createUser);
  }

export const PartiesData =  createUsers(100);

